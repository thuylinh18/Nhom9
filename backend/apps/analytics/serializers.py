from rest_framework import serializers
from .models import AIAnalysisResult


class AIAnalysisResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIAnalysisResult
        fields = [
            'id',
            'survey',
            'sentiment',
            'sentiment_breakdown',
            'topics',
            'summary',
            'created_at',
        ]
        read_only_fields = fields
