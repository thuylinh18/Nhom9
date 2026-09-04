import pytest
from django.urls import reverse
from rest_framework import status
from apps.responses.models import Answer, Feedback, Response


@pytest.mark.django_db
class TestAnalytics:
    def test_manager_view_survey_results(self, auth_client, manager_user, published_survey):
        # Create some responses
        q1 = published_survey.questions.first()
        r1 = Response.objects.create(survey=published_survey, status='SUBMITTED')
        Answer.objects.create(response=r1, question=q1, rating_value=5)

        client = auth_client(manager_user)
        url = reverse('survey-results', kwargs={'id': published_survey.id})
        response = client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['total_responses'] == 1
        assert response.data['average_rating'] == 5.0

    def test_non_manager_cannot_view_results(self, auth_client, respondent_user, published_survey):
        client = auth_client(respondent_user)
        url = reverse('survey-results', kwargs={'id': published_survey.id})
        response = client.get(url)
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_manager_view_survey_feedback(self, auth_client, manager_user, published_survey):
        r1 = Response.objects.create(survey=published_survey, status='SUBMITTED')
        Feedback.objects.create(response=r1, survey=published_survey, text='Helpful staff')

        client = auth_client(manager_user)
        url = reverse('survey-feedback', kwargs={'id': published_survey.id})
        response = client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['total_feedback'] == 1
        assert response.data['feedbacks'][0]['text'] == 'Helpful staff'

    def test_manager_trigger_and_view_ai_analysis(self, auth_client, manager_user, published_survey):
        r1 = Response.objects.create(survey=published_survey, status='SUBMITTED')
        Feedback.objects.create(response=r1, survey=published_survey, text='Response time was slow and delayed.')

        client = auth_client(manager_user)
        url = reverse('survey-ai-analysis', kwargs={'id': published_survey.id})

        # POST triggers new analysis
        post_response = client.post(url)
        assert post_response.status_code == status.HTTP_201_CREATED
        assert post_response.data['sentiment'] == 'Negative'
        assert 'Response Time' in post_response.data['topics']
        assert 'summary' in post_response.data

        # GET retrieves existing analysis
        get_response = client.get(url)
        assert get_response.status_code == status.HTTP_200_OK
        assert get_response.data['sentiment'] == 'Negative'

    def test_manager_view_dashboard(self, auth_client, manager_user, published_survey):
        client = auth_client(manager_user)
        url = reverse('dashboard-overview')
        response = client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert 'total_surveys' in response.data
        assert 'total_responses' in response.data
        assert 'average_rating' in response.data
        assert 'sentiment_overview' in response.data
