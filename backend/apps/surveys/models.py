import uuid
from django.conf import settings
from django.db import models


class SurveyStatus(models.TextChoices):
    DRAFT = 'DRAFT', 'Draft'
    PUBLISHED = 'PUBLISHED', 'Published'
    CLOSED = 'CLOSED', 'Closed'


class QuestionType(models.TextChoices):
    RATING = 'Rating', 'Rating'
    MULTIPLE_CHOICE = 'Multiple choice', 'Multiple choice'
    TEXT = 'Text', 'Text'


class Survey(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    status = models.CharField(
        max_length=20,
        choices=SurveyStatus.choices,
        default=SurveyStatus.DRAFT,
        db_index=True,
    )
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='surveys',
    )
    published_at = models.DateTimeField(null=True, blank=True)
    closed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'surveys'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.status})"

    @property
    def is_published(self):
        return self.status == SurveyStatus.PUBLISHED

    @property
    def is_draft(self):
        return self.status == SurveyStatus.DRAFT

    @property
    def is_closed(self):
        return self.status == SurveyStatus.CLOSED


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    survey = models.ForeignKey(
        Survey,
        on_delete=models.CASCADE,
        related_name='questions',
    )
    text = models.TextField()
    question_type = models.CharField(
        max_length=20,
        choices=QuestionType.choices,
        default=QuestionType.RATING,
    )
    required = models.BooleanField(default=True)
    options = models.JSONField(
        default=list,
        blank=True,
        help_text="List of choices for Multiple choice questions, e.g. ['Excellent', 'Good', 'Fair', 'Poor']",
    )
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'questions'
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.text} ({self.question_type}) - Survey: {self.survey_id}"
