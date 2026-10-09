import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MetricCard, ProgressBar, LoadingSkeleton, ErrorState } from '../../components/ui/MetricsAndStates';
import { SurveyAnalyticsData, Survey } from '../../types';
import { api } from '../../services/api';
import { Sparkles, MessageSquare, ChevronLeft, ArrowRight } from 'lucide-react';

export interface SurveyResultsScreenProps {
  surveyId: string | number;
  onBack: () => void;
  onViewFeedback: (surveyId: string | number) => void;
  onViewAIAnalysis: (surveyId: string | number) => void;
}

export const SurveyResultsScreen: React.FC<SurveyResultsScreenProps> = ({
  surveyId,
  onBack,
  onViewFeedback,
  onViewAIAnalysis
}) => {
  const [results, setResults] = useState<SurveyAnalyticsData | null>(null);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadResults = async () => {
    try {
      setLoading(true);
      setError('');
      const [resData, sData] = await Promise.all([
        api.getSurveyResults(surveyId),
        api.getSurvey(surveyId).catch(() => null)
      ]);
      setResults(resData);
      setSurvey(sData);
    } catch (err: any) {
      setError(err.message || 'Could not load survey analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, [surveyId]);

  if (loading) return <LoadingSkeleton rows={4} />;
  if (error || !results) return <ErrorState message={error} onRetry={loadResults} />;

  return (
    <div>
      {/* Back navigation */}
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          color: 'var(--color-text-secondary)',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 500,
          marginBottom: '20px'
        }}
      >
        <ChevronLeft size={16} />
        Back to dashboard
      </button>

      {/* Header Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {results.survey_title || survey?.title || 'Survey Results'}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Aggregated respondent analytics and rating distributions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            variant="secondary"
            icon={<MessageSquare size={16} />}
            onClick={() => onViewFeedback(surveyId)}
          >
            Customer Feedback
          </Button>

          <Button
            variant="ai"
            icon={<Sparkles size={16} />}
            onClick={() => onViewAIAnalysis(surveyId)}
          >
            View AI Analysis
          </Button>
        </div>
      </div>

      {/* 3 Metric cards */}
      <div className="grid-cols-4" style={{ marginBottom: '28px' }}>
        <MetricCard label="Total Responses" value={results.response_count} />
        <MetricCard label="Average Rating" value={`${results.average_rating} / 5`} />
        <MetricCard
          label="Positive Sentiment"
          value={`${results.sentiment_distribution?.positive ?? 33}%`}
          accent
        />
        <MetricCard
          label="Negative Sentiment"
          value={`${results.sentiment_distribution?.negative ?? 67}%`}
        />
      </div>

      {/* Split Cards: Rating Distribution & Recent Feedback */}
      <div className="grid-cols-2" style={{ marginBottom: '32px' }}>
        {/* Rating distribution */}
        <Card style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
            Rating Distribution
          </h3>
          {Object.entries(results.rating_distribution || {}).map(([ratingLabel, pct]) => {
            const color = ratingLabel.includes('5')
              ? 'green'
              : ratingLabel.includes('4')
              ? 'blue'
              : 'orange';
            return <ProgressBar key={ratingLabel} label={ratingLabel} percentage={pct} color={color} />;
          })}
        </Card>

        {/* Recent Feedback Quotes */}
        <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Recent Feedback</h3>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Latest submissions</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {(results.recent_feedback || []).slice(0, 2).map((fb) => (
              <p
                key={fb.id}
                style={{
                  fontStyle: 'italic',
                  fontSize: '13px',
                  color: 'var(--color-text-primary)',
                  backgroundColor: 'var(--color-bg)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-8)',
                  margin: 0,
                  borderLeft: '3px solid var(--color-secondary)'
                }}
              >
                “{fb.text}”
              </p>
            ))}
          </div>

          <div style={{ marginTop: 'auto' }}>
            <Button
              variant="link"
              icon={<ArrowRight size={14} />}
              onClick={() => onViewFeedback(surveyId)}
            >
              View all customer feedback
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
