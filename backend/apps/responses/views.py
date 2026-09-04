from django.core.exceptions import ValidationError as DjangoValidationError
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.surveys.models import Survey
from .serializers import ResponseDetailSerializer, ResponseSubmitSerializer
from .services import submit_survey_response


@extend_schema(tags=['Survey Responses'])
class SubmitResponseView(APIView):
    """
    Submit answers and feedback for a published survey (US-008, US-009, US-010).
    """
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(request=ResponseSubmitSerializer, responses={201: ResponseDetailSerializer})
    def post(self, request, survey_id):
        survey = get_object_or_404(Survey, id=survey_id)
        serializer = ResponseSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        answers_data = serializer.validated_data.get('answers', [])
        feedback_text = serializer.validated_data.get('feedback_text', '')

        try:
            response_obj = submit_survey_response(
                survey=survey,
                respondent=request.user,
                answers_data=answers_data,
                feedback_text=feedback_text,
            )
            return Response(
                ResponseDetailSerializer(response_obj).data,
                status=status.HTTP_201_CREATED,
            )
        except DjangoValidationError as exc:
            raise ValidationError({'detail': str(exc.message if hasattr(exc, 'message') else exc)})
