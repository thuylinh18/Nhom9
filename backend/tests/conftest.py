import pytest
from rest_framework.test import APIClient
from apps.accounts.models import Role, User
from apps.surveys.models import Question, QuestionType, Survey, SurveyStatus


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def researcher_user(db):
    return User.objects.create_user(
        email='researcher_test@example.com',
        password='testpassword123',
        role=Role.RESEARCHER,
        full_name='Test Researcher',
    )


@pytest.fixture
def respondent_user(db):
    return User.objects.create_user(
        email='respondent_test@example.com',
        password='testpassword123',
        role=Role.RESPONDENT,
        full_name='Test Respondent',
    )


@pytest.fixture
def manager_user(db):
    return User.objects.create_user(
        email='manager_test@example.com',
        password='testpassword123',
        role=Role.MANAGER,
        full_name='Test Manager',
    )


@pytest.fixture
def auth_client(api_client):
    def _auth(user):
        client = APIClient()
        client.force_authenticate(user=user)
        return client
    return _auth


@pytest.fixture
def sample_survey(db, researcher_user):
    survey = Survey.objects.create(
        title='Sample Customer Survey',
        description='Sample description for testing',
        status=SurveyStatus.DRAFT,
        creator=researcher_user,
    )
    Question.objects.create(
        survey=survey,
        text='How satisfied are you?',
        question_type=QuestionType.RATING,
        required=True,
        order=1,
    )
    Question.objects.create(
        survey=survey,
        text='Service quality rating?',
        question_type=QuestionType.MULTIPLE_CHOICE,
        options=['Good', 'Bad'],
        required=True,
        order=2,
    )
    return survey


@pytest.fixture
def published_survey(db, sample_survey):
    sample_survey.status = SurveyStatus.PUBLISHED
    sample_survey.save()
    return sample_survey
