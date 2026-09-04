import uuid
from django.conf import settings
from django.db import models
from apps.surveys.models import Question, Survey


class Response(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    survey = models.ForeignKey(
        Survey,
        on_delete=models.CASCADE,
        related_name='responses',
    )
    respondent = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='responses',
    )
    status = models.CharField(max_length=20, default='SUBMITTED')
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'responses'
        ordering = ['-submitted_at']

    def __str__(self):
        return f"Response {self.id} for Survey {self.survey_id}"


class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    response = models.ForeignKey(
        Response,
        on_delete=models.CASCADE,
        related_name='answers',
    )
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='answers',
    )
    rating_value = models.PositiveSmallIntegerField(null=True, blank=True)
    selected_option = models.CharField(max_length=255, null=True, blank=True)
    text_value = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'answers'
        ordering = ['created_at']

    def __str__(self):
        return f"Answer to {self.question_id}: {self.rating_value or self.selected_option or self.text_value}"


class Feedback(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    response = models.OneToOneField(
        Response,
        on_delete=models.CASCADE,
        related_name='feedback',
    )
    survey = models.ForeignKey(
        Survey,
        on_delete=models.CASCADE,
        related_name='feedbacks',
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'feedbacks'
        ordering = ['-created_at']

    def __str__(self):
        return f"Feedback for Survey {self.survey_id}: {self.text[:50]}"
