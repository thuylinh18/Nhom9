from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.permissions import IsManager
from apps.responses.models import Feedback
from apps.responses.serializers import FeedbackSerializer
from apps.surveys.models import Survey
from .models import AIAnalysisResult
from .serializers import AIAnalysisResultSerializer
from .services import get_dashboard_overview, get_survey_results, perform_ai_analysis


@extend_schema(tags=['Analytics & Results'])
class SurveyResultsView(APIView):
    """
    Retrieve aggregated statistical results for a survey (US-011 / REQ-011).
    """
    permission_classes = [permissions.IsAuthenticated, IsManager]

    def get(self, request, id):
        survey = get_object_or_404(Survey, id=id)
        results = get_survey_results(survey)
        return Response(results, status=status.HTTP_200_OK)


@extend_schema(tags=['Analytics & Results'])
class SurveyFeedbackListView(APIView):
    """
    Retrieve all customer text feedbacks submitted for a specific survey (US-012 / REQ-012).
    """
    permission_classes = [permissions.IsAuthenticated, IsManager]

    def get(self, request, id):
        survey = get_object_or_404(Survey, id=id)
        feedbacks = survey.feedbacks.all()
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response({
            'survey_id': str(survey.id),
            'title': survey.title,
            'total_feedback': feedbacks.count(),
            'feedbacks': serializer.data,
        }, status=status.HTTP_200_OK)


@extend_schema(tags=['Analytics & Results'])
class SurveyAIAnalysisView(APIView):
    """
    Retrieve or trigger AI analysis (sentiment, topics, summary) for survey feedbacks (US-013, US-014).
    """
    permission_classes = [permissions.IsAuthenticated, IsManager]

    def get(self, request, id):
        survey = get_object_or_404(Survey, id=id)
        latest_analysis = survey.ai_analyses.first()
        if not latest_analysis:
            # Generate if none exists yet
            latest_analysis = perform_ai_analysis(survey)
        serializer = AIAnalysisResultSerializer(latest_analysis)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, id):
        survey = get_object_or_404(Survey, id=id)
        analysis = perform_ai_analysis(survey)
        serializer = AIAnalysisResultSerializer(analysis)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(tags=['Analytics & Results'])
class DashboardOverviewView(APIView):
    """
    Retrieve high-level KPI dashboard overview for Managers (US-015 / REQ-017).
    """
    permission_classes = [permissions.IsAuthenticated, IsManager]

    def get(self, request):
        metrics = get_dashboard_overview()
        return Response(metrics, status=status.HTTP_200_OK)
