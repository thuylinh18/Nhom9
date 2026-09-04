from typing import Any, Dict, List, Optional
from django.core.exceptions import ValidationError
from django.db import transaction
from apps.surveys.models import QuestionType, Survey, SurveyStatus
from .models import Answer, Feedback, Response


def submit_survey_response(
    survey: Survey,
    respondent: Optional[Any],
    answers_data: List[Dict[str, Any]],
    feedback_text: Optional[str] = None,
) -> Response:
    """
    Submits a response for a survey with full business rule validations (US-009, US-010).
    - Checks survey status is PUBLISHED (BR-001, BR-002).
    - Verifies all required questions are answered (AC-US009-02).
    - Atomically creates Response, Answers, and optional Feedback.
    """
    if survey.status != SurveyStatus.PUBLISHED:
        raise ValidationError("Survey is not active or not currently accepting responses.")

    # Build question lookup
    questions = {str(q.id): q for q in survey.questions.all()}
    answers_by_qid = {str(a.get('question_id')): a for a in answers_data}

    # Verify required questions
    missing_questions = []
    for q_id, question in questions.items():
        if question.required:
            ans = answers_by_qid.get(q_id)
            if not ans:
                missing_questions.append(question.text)
            else:
                val = ans.get('rating_value') or ans.get('selected_option') or ans.get('text_value')
                if val is None or str(val).strip() == '':
                    missing_questions.append(question.text)

    if missing_questions:
        raise ValidationError("Please answer all required questions.")

    with transaction.atomic():
        response = Response.objects.create(
            survey=survey,
            respondent=respondent if respondent and respondent.is_authenticated else None,
            status='SUBMITTED',
        )

        for ans in answers_data:
            q_id = str(ans.get('question_id'))
            question = questions.get(q_id)
            if not question:
                continue

            rating_value = ans.get('rating_value')
            selected_option = ans.get('selected_option')
            text_value = ans.get('text_value')

            # Validation per question type
            if question.question_type == QuestionType.RATING and rating_value is not None:
                if not (1 <= int(rating_value) <= 5):
                    raise ValidationError(f"Rating must be between 1 and 5 for question: {question.text}")

            Answer.objects.create(
                response=response,
                question=question,
                rating_value=rating_value,
                selected_option=selected_option,
                text_value=text_value,
            )

        if feedback_text and feedback_text.strip():
            Feedback.objects.create(
                response=response,
                survey=survey,
                text=feedback_text.strip(),
            )

    return response
