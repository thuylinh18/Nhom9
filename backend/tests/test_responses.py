import pytest
from django.urls import reverse
from rest_framework import status
from apps.responses.models import Answer, Feedback, Response
from apps.surveys.models import SurveyStatus


@pytest.mark.django_db
class TestResponses:
    def test_submit_valid_response(self, auth_client, respondent_user, published_survey):
        client = auth_client(respondent_user)
        url = reverse('survey-submit-response', kwargs={'survey_id': published_survey.id})

        q1, q2 = published_survey.questions.all()[:2]
        payload = {
            'answers': [
                {'question_id': str(q1.id), 'rating_value': 5},
                {'question_id': str(q2.id), 'selected_option': 'Good'},
            ],
            'feedback_text': 'Great service, highly satisfied!',
        }

        response = client.post(url, payload, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['status'] == 'SUBMITTED'

        # Verify DB persistence
        assert Response.objects.filter(survey=published_survey).count() == 1
        assert Answer.objects.filter(response__survey=published_survey).count() == 2
        assert Feedback.objects.filter(survey=published_survey, text='Great service, highly satisfied!').count() == 1

    def test_submit_missing_required_question_rejected(self, auth_client, respondent_user, published_survey):
        client = auth_client(respondent_user)
        url = reverse('survey-submit-response', kwargs={'survey_id': published_survey.id})

        q1 = published_survey.questions.first()
        payload = {
            'answers': [
                {'question_id': str(q1.id), 'rating_value': 5},
                # Missing q2 which is required
            ],
            'feedback_text': 'Incomplete response',
        }

        response = client.post(url, payload, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'detail' in response.data

    def test_submit_to_closed_survey_rejected(self, auth_client, respondent_user, published_survey):
        published_survey.status = SurveyStatus.CLOSED
        published_survey.save()

        client = auth_client(respondent_user)
        url = reverse('survey-submit-response', kwargs={'survey_id': published_survey.id})

        q1, q2 = published_survey.questions.all()[:2]
        payload = {
            'answers': [
                {'question_id': str(q1.id), 'rating_value': 4},
                {'question_id': str(q2.id), 'selected_option': 'Good'},
            ],
            'feedback_text': 'Attempt after close',
        }

        response = client.post(url, payload, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
