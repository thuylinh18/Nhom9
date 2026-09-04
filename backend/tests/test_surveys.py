import pytest
from django.urls import reverse
from rest_framework import status
from apps.surveys.models import Survey, SurveyStatus


@pytest.mark.django_db
class TestSurveys:
    def test_researcher_create_survey_draft(self, auth_client, researcher_user):
        client = auth_client(researcher_user)
        url = reverse('survey-list-create')
        data = {
            'title': 'New Feedback Survey',
            'description': 'Gathering feedback',
        }
        response = client.post(url, data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['title'] == 'New Feedback Survey'
        assert response.data['status'] == SurveyStatus.DRAFT

    def test_respondent_cannot_create_survey(self, auth_client, respondent_user):
        client = auth_client(respondent_user)
        url = reverse('survey-list-create')
        data = {'title': 'Invalid Survey'}
        response = client.post(url, data, format='json')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_survey_creation_requires_title(self, auth_client, researcher_user):
        client = auth_client(researcher_user)
        url = reverse('survey-list-create')
        data = {'title': '', 'description': 'No title'}
        response = client.post(url, data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_researcher_can_edit_draft_survey(self, auth_client, researcher_user, sample_survey):
        client = auth_client(researcher_user)
        url = reverse('survey-detail', kwargs={'id': sample_survey.id})
        data = {'title': 'Updated Title', 'description': 'Updated Desc'}
        response = client.put(url, data, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['title'] == 'Updated Title'

    def test_cannot_edit_published_survey(self, auth_client, researcher_user, published_survey):
        client = auth_client(researcher_user)
        url = reverse('survey-detail', kwargs={'id': published_survey.id})
        data = {'title': 'Attempt to edit published'}
        response = client.put(url, data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'detail' in response.data

    def test_add_question_to_survey(self, auth_client, researcher_user, sample_survey):
        client = auth_client(researcher_user)
        url = reverse('question-list-create', kwargs={'survey_id': sample_survey.id})
        data = {
            'text': 'What can we improve?',
            'question_type': 'Text',
            'required': False,
            'order': 3,
        }
        response = client.post(url, data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['text'] == 'What can we improve?'

    def test_cannot_publish_survey_without_questions(self, auth_client, researcher_user):
        client = auth_client(researcher_user)
        empty_survey = Survey.objects.create(
            title='Empty Survey',
            creator=researcher_user,
            status=SurveyStatus.DRAFT,
        )
        url = reverse('survey-publish', kwargs={'id': empty_survey.id})
        response = client.post(url)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'detail' in response.data

    def test_publish_survey_success(self, auth_client, researcher_user, sample_survey):
        client = auth_client(researcher_user)
        url = reverse('survey-publish', kwargs={'id': sample_survey.id})
        response = client.post(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == SurveyStatus.PUBLISHED

    def test_close_survey_success(self, auth_client, researcher_user, published_survey):
        client = auth_client(researcher_user)
        url = reverse('survey-close', kwargs={'id': published_survey.id})
        response = client.post(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == SurveyStatus.CLOSED

    def test_respondent_can_view_published_surveys(self, auth_client, respondent_user, published_survey):
        client = auth_client(respondent_user)
        url = reverse('survey-available-list')
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        survey_ids = [s['id'] for s in response.data['results']]
        assert str(published_survey.id) in survey_ids
