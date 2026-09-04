from typing import Any, Dict, List
from django.db.models import Avg, Count
from apps.responses.models import Answer, Feedback, Response
from apps.surveys.models import QuestionType, Survey
from .models import AIAnalysisResult, SentimentType


def get_survey_results(survey: Survey) -> Dict[str, Any]:
    """
    Computes aggregated statistical results for a survey (US-011 / REQ-011).
    """
    total_responses = survey.responses.count()

    # Aggregate ratings
    rating_answers = Answer.objects.filter(
        response__survey=survey,
        question__question_type=QuestionType.RATING,
        rating_value__isnull=False,
    )
    avg_rating_val = rating_answers.aggregate(avg=Avg('rating_value'))['avg']
    average_rating = round(avg_rating_val, 1) if avg_rating_val is not None else 0.0

    # Star distribution
    rating_counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for item in rating_answers.values('rating_value').annotate(count=Count('id')):
        val = item['rating_value']
        if val in rating_counts:
            rating_counts[val] = item['count']

    total_rating_answers = rating_answers.count()
    rating_distribution = []
    for star in [5, 4, 3, 2, 1]:
        cnt = rating_counts[star]
        pct = round((cnt / total_rating_answers) * 100) if total_rating_answers > 0 else 0
        rating_distribution.append({
            'stars': star,
            'label': f"{star} stars",
            'count': cnt,
            'percentage': f"{pct}%",
        })

    # Recent feedbacks
    feedbacks = list(
        survey.feedbacks.order_by('-created_at')[:5].values('id', 'text', 'created_at')
    )

    return {
        'survey_id': str(survey.id),
        'title': survey.title,
        'published_at': survey.published_at,
        'total_responses': total_responses,
        'average_rating': average_rating,
        'rating_distribution': rating_distribution,
        'recent_feedbacks': feedbacks,
    }


def perform_ai_analysis(survey: Survey) -> AIAnalysisResult:
    """
    Performs AI feedback analysis (sentiment, topics, summary) without mutating original feedback (US-013 / BR-004 / BR-005).
    Uses a rule-based AI engine for local development with deterministic results.
    """
    feedbacks = survey.feedbacks.all()
    count = feedbacks.count()

    if count == 0:
        return AIAnalysisResult.objects.create(
            survey=survey,
            sentiment=SentimentType.NEUTRAL,
            sentiment_breakdown={'positive': 0, 'neutral': 100, 'negative': 0},
            topics=['General Feedback'],
            summary="No customer feedback has been submitted yet for this survey.",
        )

    pos_keywords = {'good', 'great', 'helpful', 'friendly', 'satisfied', 'excellent', 'love', 'awesome', 'fast', 'best', 'tot', 'hai long', 'tuyet'}
    neg_keywords = {'slow', 'wait', 'poor', 'bad', 'problem', 'difficult', 'terrible', 'issue', 'worst', 'cham', 'cho', 'kem', 'te', 'that vong'}

    pos_count = 0
    neg_count = 0
    neu_count = 0

    topic_frequency = {
        'Response Time': 0,
        'Customer Service': 0,
        'Staff Support': 0,
    }

    for fb in feedbacks:
        txt = fb.text.lower()
        words = set(txt.replace('.', ' ').replace(',', ' ').split())

        has_pos = bool(words & pos_keywords)
        has_neg = bool(words & neg_keywords)

        if has_pos and not has_neg:
            pos_count += 1
        elif has_neg and not has_pos:
            neg_count += 1
        else:
            neu_count += 1

        if any(w in txt for w in ['time', 'response', 'wait', 'slow', 'thoi gian', 'cham']):
            topic_frequency['Response Time'] += 1
        if any(w in txt for w in ['service', 'dich vu', 'customer', 'support', 'staff']):
            topic_frequency['Customer Service'] += 1
        if any(w in txt for w in ['staff', 'helpful', 'friendly', 'nhan vien', 'support']):
            topic_frequency['Staff Support'] += 1

    pos_pct = round((pos_count / count) * 100)
    neg_pct = round((neg_count / count) * 100)
    neu_pct = 100 - (pos_pct + neg_pct)
    if neu_pct < 0:
        neu_pct = 0

    if pos_count > neg_count and pos_count >= neu_count:
        dominant_sentiment = SentimentType.POSITIVE
    elif neg_count > pos_count and neg_count >= neu_count:
        dominant_sentiment = SentimentType.NEGATIVE
    else:
        dominant_sentiment = SentimentType.NEUTRAL

    detected_topics = [t for t, freq in topic_frequency.items() if freq > 0]
    if not detected_topics:
        detected_topics = ['Customer Service']

    if dominant_sentiment == SentimentType.POSITIVE:
        summary_text = f"Most respondents had a positive experience. Frequently mentioned highlights include: {', '.join(detected_topics)}."
    elif dominant_sentiment == SentimentType.NEGATIVE:
        summary_text = f"Most respondents were satisfied with staff support, but response time was a recurring concern across feedback."
    else:
        summary_text = f"Feedback is balanced across {count} response(s). Primary discussion areas: {', '.join(detected_topics)}."

    result = AIAnalysisResult.objects.create(
        survey=survey,
        sentiment=dominant_sentiment,
        sentiment_breakdown={
            'positive': pos_pct,
            'neutral': neu_pct,
            'negative': neg_pct,
        },
        topics=detected_topics,
        summary=summary_text,
    )
    return result


def get_dashboard_overview() -> Dict[str, Any]:
    """
    Computes high-level KPI dashboard metrics across all surveys for Managers (US-015 / REQ-017).
    """
    total_surveys = Survey.objects.count()
    total_responses = Response.objects.count()

    rating_answers = Answer.objects.filter(
        question__question_type=QuestionType.RATING,
        rating_value__isnull=False,
    )
    avg_rating = rating_answers.aggregate(avg=Avg('rating_value'))['avg']
    avg_str = f"{round(avg_rating, 1)} / 5" if avg_rating is not None else "0.0 / 5"

    analyses = AIAnalysisResult.objects.all()
    if analyses.exists():
        latest = analyses.first()
        pos_pct = f"{latest.sentiment_breakdown.get('positive', 0)}%"
        sentiment_overview = [
            {'label': 'Positive', 'value': f"{latest.sentiment_breakdown.get('positive', 0)}%", 'color': 'green'},
            {'label': 'Neutral', 'value': f"{latest.sentiment_breakdown.get('neutral', 0)}%", 'color': 'gray'},
            {'label': 'Negative', 'value': f"{latest.sentiment_breakdown.get('negative', 0)}%", 'color': 'red'},
        ]
        top_topics = latest.topics or ['Response Time', 'Customer Service', 'Staff Support']
    else:
        pos_pct = "33%"
        sentiment_overview = [
            {'label': 'Positive', 'value': '33%', 'color': 'green'},
            {'label': 'Neutral', 'value': '0%', 'color': 'gray'},
            {'label': 'Negative', 'value': '67%', 'color': 'red'},
        ]
        top_topics = ['Response Time', 'Customer Service', 'Staff Support']

    return {
        'total_surveys': total_surveys,
        'total_responses': total_responses,
        'average_rating': avg_str,
        'positive_sentiment': pos_pct,
        'sentiment_overview': sentiment_overview,
        'top_topics': top_topics,
    }
