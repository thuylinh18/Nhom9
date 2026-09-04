from django.urls import path
from apps.responses.views import SubmitResponseView
from .views import (
    AvailableSurveysListView,
    CloseSurveyView,
    PublishSurveyView,
    QuestionDetailView,
    QuestionListCreateView,
    SurveyDetailView,
    SurveyListCreateView,
)

urlpatterns = [
    path('', SurveyListCreateView.as_view(), name='survey-list-create'),
    path('available/', AvailableSurveysListView.as_view(), name='survey-available-list'),
    path('<uuid:id>/', SurveyDetailView.as_view(), name='survey-detail'),
    path('<uuid:id>/publish/', PublishSurveyView.as_view(), name='survey-publish'),
    path('<uuid:id>/close/', CloseSurveyView.as_view(), name='survey-close'),
    path('<uuid:survey_id>/questions/', QuestionListCreateView.as_view(), name='question-list-create'),
    path('<uuid:survey_id>/questions/<uuid:id>/', QuestionDetailView.as_view(), name='question-detail'),
    path('<uuid:survey_id>/submit/', SubmitResponseView.as_view(), name='survey-submit-response'),
]
