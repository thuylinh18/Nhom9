from rest_framework import serializers
from .models import Answer, Feedback, Response


class AnswerSerializer(serializers.ModelSerializer):
    question_text = serializers.CharField(source='question.text', read_only=True)
    question_type = serializers.CharField(source='question.question_type', read_only=True)

    class Meta:
        model = Answer
        fields = [
            'id',
            'question',
            'question_text',
            'question_type',
            'rating_value',
            'selected_option',
            'text_value',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'survey', 'text', 'created_at']
        read_only_fields = ['id', 'survey', 'created_at']


class ResponseDetailSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    feedback = FeedbackSerializer(read_only=True)

    class Meta:
        model = Response
        fields = [
            'id',
            'survey',
            'respondent',
            'status',
            'answers',
            'feedback',
            'submitted_at',
        ]
        read_only_fields = fields


class AnswerSubmitSerializer(serializers.Serializer):
    question_id = serializers.UUIDField()
    rating_value = serializers.IntegerField(required=False, allow_null=True)
    selected_option = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    text_value = serializers.CharField(required=False, allow_blank=True, allow_null=True)


class ResponseSubmitSerializer(serializers.Serializer):
    answers = AnswerSubmitSerializer(many=True)
    feedback_text = serializers.CharField(required=False, allow_blank=True)
