from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.accounts.models import Role, User
from apps.analytics.models import AIAnalysisResult, SentimentType
from apps.responses.models import Answer, Feedback, Response
from apps.surveys.models import Question, QuestionType, Survey, SurveyStatus


class Command(BaseCommand):
    help = 'Seeds initial demo data (users, survey, questions, responses, feedback, AI results) matching prototype'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Seeding database with demo data...'))

        # 1. Seed Users
        researcher, _ = User.objects.get_or_create(
            email='researcher@insightflow.com',
            defaults={
                'username': 'researcher',
                'full_name': 'Dr. Emily Carter',
                'role': Role.RESEARCHER,
            },
        )
        researcher.set_password('password')
        researcher.save()

        respondent, _ = User.objects.get_or_create(
            email='respondent@insightflow.com',
            defaults={
                'username': 'respondent',
                'full_name': 'Alex Johnson',
                'role': Role.RESPONDENT,
            },
        )
        respondent.set_password('password')
        respondent.save()

        manager, _ = User.objects.get_or_create(
            email='manager@insightflow.com',
            defaults={
                'username': 'manager',
                'full_name': 'Sarah Connor',
                'role': Role.MANAGER,
            },
        )
        manager.set_password('password')
        manager.save()

        admin, _ = User.objects.get_or_create(
            email='admin@insightflow.com',
            defaults={
                'username': 'admin',
                'full_name': 'System Administrator',
                'role': Role.ADMIN,
                'is_staff': True,
                'is_superuser': True,
            },
        )
        admin.set_password('password')
        admin.save()

        self.stdout.write(self.style.SUCCESS('  Users created: researcher, respondent, manager, admin (password: password)'))

        # 2. Seed Survey
        survey, created = Survey.objects.get_or_create(
            title='Customer Service Feedback Survey',
            defaults={
                'description': 'Please provide feedback about your recent customer service experience.',
                'status': SurveyStatus.PUBLISHED,
                'creator': researcher,
                'published_at': timezone.now(),
            },
        )
        if not created:
            survey.status = SurveyStatus.PUBLISHED
            survey.save()

        self.stdout.write(self.style.SUCCESS(f'  Survey created: "{survey.title}"'))

        # 3. Seed Questions
        q1, _ = Question.objects.get_or_create(
            survey=survey,
            order=1,
            defaults={
                'text': 'How satisfied are you with our service?',
                'question_type': QuestionType.RATING,
                'required': True,
            },
        )
        q2, _ = Question.objects.get_or_create(
            survey=survey,
            order=2,
            defaults={
                'text': 'How would you rate the response time?',
                'question_type': QuestionType.MULTIPLE_CHOICE,
                'options': ['Excellent', 'Good', 'Fair', 'Poor'],
                'required': True,
            },
        )
        q3, _ = Question.objects.get_or_create(
            survey=survey,
            order=3,
            defaults={
                'text': 'What could we improve?',
                'question_type': QuestionType.TEXT,
                'required': False,
            },
        )
        self.stdout.write(self.style.SUCCESS('  Questions created: 3 questions (Rating, Multiple choice, Text)'))

        # 4. Seed Responses & Feedback
        if not survey.responses.exists():
            # Response #1
            r1 = Response.objects.create(survey=survey, respondent=respondent, status='SUBMITTED')
            Answer.objects.create(response=r1, question=q1, rating_value=4)
            Answer.objects.create(response=r1, question=q2, selected_option='Fair')
            Answer.objects.create(response=r1, question=q3, text_value='Response time was slow.')
            Feedback.objects.create(
                response=r1,
                survey=survey,
                text='Overall the service was good, but the response time was slow.',
            )

            # Response #2
            r2 = Response.objects.create(survey=survey, respondent=None, status='SUBMITTED')
            Answer.objects.create(response=r2, question=q1, rating_value=5)
            Answer.objects.create(response=r2, question=q2, selected_option='Excellent')
            Feedback.objects.create(
                response=r2,
                survey=survey,
                text='The staff were very helpful and friendly.',
            )

            # Response #3
            r3 = Response.objects.create(survey=survey, respondent=None, status='SUBMITTED')
            Answer.objects.create(response=r3, question=q1, rating_value=2)
            Answer.objects.create(response=r3, question=q2, selected_option='Poor')
            Feedback.objects.create(
                response=r3,
                survey=survey,
                text='I had to wait too long before receiving support.',
            )
            self.stdout.write(self.style.SUCCESS('  Responses & Feedbacks created: 3 entries matching prototype'))

        # 5. Seed AI Analysis Result
        if not survey.ai_analyses.exists():
            AIAnalysisResult.objects.create(
                survey=survey,
                sentiment=SentimentType.NEGATIVE,
                sentiment_breakdown={'positive': 33, 'neutral': 0, 'negative': 67},
                topics=['Response Time', 'Customer Service', 'Staff Support'],
                summary='Most respondents were satisfied with staff support, but response time was a recurring concern.',
            )
            self.stdout.write(self.style.SUCCESS('  AI Analysis result created matching prototype'))

        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully!'))
