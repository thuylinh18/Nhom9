from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import Survey, SurveyStatus


def publish_survey(survey: Survey) -> Survey:
    """
    Publish a survey according to business rules:
    - Must be in DRAFT status.
    - Must have at least one question (BR-003).
    """
    if survey.status == SurveyStatus.PUBLISHED:
        return survey

    if survey.status == SurveyStatus.CLOSED:
        raise ValidationError("A closed survey cannot be published again.")

    if not survey.questions.exists():
        raise ValidationError("Cannot publish survey without at least one question.")

    survey.status = SurveyStatus.PUBLISHED
    survey.published_at = timezone.now()
    survey.save(update_fields=['status', 'published_at', 'updated_at'])
    return survey


def close_survey(survey: Survey) -> Survey:
    """
    Close an active survey to stop accepting new responses (REQ-006 / BR-002).
    """
    if survey.status == SurveyStatus.CLOSED:
        return survey

    if survey.status != SurveyStatus.PUBLISHED:
        raise ValidationError("Only published surveys can be closed.")

    survey.status = SurveyStatus.CLOSED
    survey.closed_at = timezone.now()
    survey.save(update_fields=['status', 'closed_at', 'updated_at'])
    return survey


def check_survey_can_be_edited(survey: Survey) -> None:
    """
    Check if survey is in an editable state (REQ-003 / UC-003).
    Researcher can only edit surveys before they are published.
    """
    if survey.status != SurveyStatus.DRAFT:
        raise ValidationError("Cannot edit survey that has already been published or closed.")
