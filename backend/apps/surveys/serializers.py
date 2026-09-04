from rest_framework import serializers
from .models import Question, QuestionType, Survey, SurveyStatus


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id',
            'survey',
            'text',
            'question_type',
            'required',
            'options',
            'order',
            'created_at',
        ]
        read_only_fields = ['id', 'survey', 'created_at']

    def validate(self, attrs):
        q_type = attrs.get('question_type') or (self.instance.question_type if self.instance else None)
        options = attrs.get('options') or (self.instance.options if self.instance else [])

        if q_type == QuestionType.MULTIPLE_CHOICE and not options:
            raise serializers.ValidationError({"options": "Multiple choice questions must have at least one option."})

        return attrs


class SurveySerializer(serializers.ModelSerializer):
    questions_count = serializers.IntegerField(source='questions.count', read_only=True)
    responses_count = serializers.SerializerMethodField()

    class Meta:
        model = Survey
        fields = [
            'id',
            'title',
            'description',
            'status',
            'creator',
            'questions_count',
            'responses_count',
            'published_at',
            'closed_at',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'id',
            'status',
            'creator',
            'questions_count',
            'responses_count',
            'published_at',
            'closed_at',
            'created_at',
            'updated_at',
        ]

    def get_responses_count(self, obj):
        if hasattr(obj, 'responses'):
            return obj.responses.count()
        return 0


class SurveyDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    questions_count = serializers.IntegerField(source='questions.count', read_only=True)
    responses_count = serializers.SerializerMethodField()

    class Meta:
        model = Survey
        fields = [
            'id',
            'title',
            'description',
            'status',
            'creator',
            'questions',
            'questions_count',
            'responses_count',
            'published_at',
            'closed_at',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'id',
            'status',
            'creator',
            'questions',
            'questions_count',
            'responses_count',
            'published_at',
            'closed_at',
            'created_at',
            'updated_at',
        ]

    def get_responses_count(self, obj):
        if hasattr(obj, 'responses'):
            return obj.responses.count()
        return 0


class SurveyCreateUpdateSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=255, required=True, allow_blank=False)

    class Meta:
        model = Survey
        fields = ['id', 'title', 'description', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['creator'] = user
        validated_data['status'] = SurveyStatus.DRAFT
        return super().create(validated_data)
