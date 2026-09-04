from django.core.exceptions import ValidationError as DjangoValidationError
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.permissions import IsResearcher, IsRespondent, IsSurveyOwnerOrReadOnly
from .models import Question, Survey, SurveyStatus
from .serializers import (
    QuestionSerializer,
    SurveyCreateUpdateSerializer,
    SurveyDetailSerializer,
    SurveySerializer,
)
from .services import check_survey_can_be_edited, close_survey, publish_survey


@extend_schema(tags=['Surveys'])
class SurveyListCreateView(generics.ListCreateAPIView):
    """
    List surveys created by the authenticated researcher, or create a new survey (US-002).
    """
    permission_classes = [permissions.IsAuthenticated, IsResearcher]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return SurveyCreateUpdateSerializer
        return SurveySerializer

    def get_queryset(self):
        return Survey.objects.filter(creator=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


@extend_schema(tags=['Surveys'])
class AvailableSurveysListView(generics.ListAPIView):
    """
    List all active surveys currently in PUBLISHED status available for respondents (US-007).
    """
    serializer_class = SurveySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Survey.objects.filter(status=SurveyStatus.PUBLISHED)


@extend_schema(tags=['Surveys'])
class SurveyDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve survey details, or edit/delete survey if in DRAFT status (US-003).
    """
    permission_classes = [permissions.IsAuthenticated, IsSurveyOwnerOrReadOnly]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return SurveyCreateUpdateSerializer
        return SurveyDetailSerializer

    def get_queryset(self):
        user = self.request.user
        # Researchers see their own surveys; others can see published surveys
        if user.role == 'RESEARCHER':
            return Survey.objects.filter(creator=user)
        return Survey.objects.filter(status=SurveyStatus.PUBLISHED)

    def perform_update(self, serializer):
        survey = self.get_object()
        try:
            check_survey_can_be_edited(survey)
        except DjangoValidationError as exc:
            raise ValidationError({'detail': str(exc.message if hasattr(exc, 'message') else exc)})
        serializer.save()

    def perform_destroy(self, instance):
        try:
            check_survey_can_be_edited(instance)
        except DjangoValidationError as exc:
            raise ValidationError({'detail': str(exc.message if hasattr(exc, 'message') else exc)})
        instance.delete()


@extend_schema(tags=['Surveys'], request=None, responses={200: SurveyDetailSerializer})
class PublishSurveyView(APIView):
    """
    Publish a survey to make it accessible to respondents (US-005).
    Enforces business rule BR-003: Survey must contain questions.
    """
    permission_classes = [permissions.IsAuthenticated, IsResearcher]

    def post(self, request, id):
        survey = get_object_or_404(Survey, id=id, creator=request.user)
        try:
            survey = publish_survey(survey)
            return Response(SurveyDetailSerializer(survey).data, status=status.HTTP_200_OK)
        except DjangoValidationError as exc:
            raise ValidationError({'detail': str(exc.message if hasattr(exc, 'message') else exc)})


@extend_schema(tags=['Surveys'], request=None, responses={200: SurveyDetailSerializer})
class CloseSurveyView(APIView):
    """
    Close an active survey to stop accepting new responses (US-006).
    """
    permission_classes = [permissions.IsAuthenticated, IsResearcher]

    def post(self, request, id):
        survey = get_object_or_404(Survey, id=id, creator=request.user)
        try:
            survey = close_survey(survey)
            return Response(SurveyDetailSerializer(survey).data, status=status.HTTP_200_OK)
        except DjangoValidationError as exc:
            raise ValidationError({'detail': str(exc.message if hasattr(exc, 'message') else exc)})


@extend_schema(tags=['Questions'])
class QuestionListCreateView(generics.ListCreateAPIView):
    """
    List questions or add a new question to a survey (US-004).
    """
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_survey(self):
        survey_id = self.kwargs.get('survey_id')
        survey = get_object_or_404(Survey, id=survey_id)
        return survey

    def get_queryset(self):
        survey = self.get_survey()
        return survey.questions.all()

    def perform_create(self, serializer):
        survey = self.get_survey()
        if survey.creator != self.request.user:
            raise PermissionDenied("You can only add questions to your own surveys.")
        try:
            check_survey_can_be_edited(survey)
        except DjangoValidationError as exc:
            raise ValidationError({'detail': str(exc.message if hasattr(exc, 'message') else exc)})
        serializer.save(survey=survey)


@extend_schema(tags=['Questions'])
class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a question in a survey (US-004).
    """
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated, IsSurveyOwnerOrReadOnly]
    lookup_field = 'id'

    def get_queryset(self):
        survey_id = self.kwargs.get('survey_id')
        return Question.objects.filter(survey_id=survey_id)

    def perform_update(self, serializer):
        question = self.get_object()
        try:
            check_survey_can_be_edited(question.survey)
        except DjangoValidationError as exc:
            raise ValidationError({'detail': str(exc.message if hasattr(exc, 'message') else exc)})
        serializer.save()

    def perform_destroy(self, instance):
        try:
            check_survey_can_be_edited(instance.survey)
        except DjangoValidationError as exc:
            raise ValidationError({'detail': str(exc.message if hasattr(exc, 'message') else exc)})
        instance.delete()
