import uuid
from django.db import models
from apps.surveys.models import Survey


class SentimentType(models.TextChoices):
    POSITIVE = 'Positive', 'Positive'
    NEUTRAL = 'Neutral', 'Neutral'
    NEGATIVE = 'Negative', 'Negative'


class AIAnalysisResult(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    survey = models.ForeignKey(
        Survey,
        on_delete=models.CASCADE,
        related_name='ai_analyses',
    )
    sentiment = models.CharField(
        max_length=20,
        choices=SentimentType.choices,
        default=SentimentType.NEUTRAL,
    )
    sentiment_breakdown = models.JSONField(
        default=dict,
        help_text="Breakdown percentages e.g. {'positive': 33, 'neutral': 0, 'negative': 67}",
    )
    topics = models.JSONField(
        default=list,
        help_text="List of extracted topic labels e.g. ['Response Time', 'Customer Service']",
    )
    summary = models.TextField(help_text="AI-generated executive feedback summary")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'ai_analysis_results'
        ordering = ['-created_at']

    def __str__(self):
        return f"AI Analysis for {self.survey_id} ({self.sentiment})"
