from django.urls import path
from .views import (
    DashboardOverviewView,
    SurveyAIAnalysisView,
    SurveyFeedbackListView,
    SurveyResultsView,
)

urlpatterns = [
    path('surveys/<uuid:id>/results/', SurveyResultsView.as_view(), name='survey-results'),
    path('surveys/<uuid:id>/feedback/', SurveyFeedbackListView.as_view(), name='survey-feedback'),
    path('surveys/<uuid:id>/ai-analysis/', SurveyAIAnalysisView.as_view(), name='survey-ai-analysis'),
    path('dashboard/', DashboardOverviewView.as_view(), name='dashboard-overview'),
]
