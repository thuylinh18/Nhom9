import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MetricCard, ProgressBar, LoadingSkeleton, ErrorState } from '../../components/ui/MetricsAndStates';
import { SurveyCard } from '../../components/survey/SurveyCard';
import { DashboardMetrics, Survey } from '../../types';
import { api } from '../../services/api';
import { Sparkles } from 'lucide-react';

export interface SurveyDashboardScreenProps {
  onSelectSurveyResults: (surveyId: string | number) => void;
  onViewGlobalAI: () => void;
}

export const SurveyDashboardScreen: React.FC<SurveyDashboardScreenProps> = ({
  onSelectSurveyResults,
  onViewGlobalAI
}) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [m, sList] = await Promise.all([
        api.getDashboard(),
        api.getSurveys()
      ]);
      setMetrics(m);
      setSurveys(sList);
    } catch (err: any) {
      setError(err.message || 'Could not load dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <LoadingSkeleton rows={4} />;
  if (error || !metrics) return <ErrorState message={error} onRetry={loadData} />;

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Analytics Overview
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          An overview of customer feedback and satisfaction metrics across your published surveys.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid-cols-4" style={{ marginBottom: '28px' }}>
        <MetricCard label="Total Surveys" value={metrics.total_surveys} />
        <MetricCard label="Total Responses" value={metrics.total_responses} />
        <MetricCard label="Average Rating" value={`${metrics.average_rating} / 5`} />
        <MetricCard
          label="Positive Sentiment"
          value={`${metrics.positive_sentiment_percent}%`}
          accent
        />
      </div>

      {/* Split Cards: Sentiment Overview & Top Topics */}
      <div className="grid-cols-2" style={{ marginBottom: '32px' }}>
        <Card style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
            Sentiment Overview
          </h3>
          <ProgressBar
            label="Positive"
            percentage={metrics.sentiment_overview.positive}
            color="green"
          />
          <ProgressBar
            label="Neutral"
            percentage={metrics.sentiment_overview.neutral}
            color="gray"
          />
          <ProgressBar
            label="Negative"
            percentage={metrics.sentiment_overview.negative}
            color="red"
          />
        </Card>

        <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Top Topics</h3>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>From customer feedback</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {metrics.top_topics.map((topic) => (
              <span
                key={topic}
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                {topic}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 'auto' }}>
            <Button
              variant="ai"
              size="sm"
              icon={<Sparkles size={16} />}
              onClick={onViewGlobalAI}
            >
              Explore AI Insights
            </Button>
          </div>
        </Card>
      </div>

      {/* Published Surveys Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Surveys</h3>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
            Select a survey to view detailed results & feedback
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px'
          }}
        >
          {surveys.map((survey) => (
            <SurveyCard
              key={survey.id}
              survey={survey}
              mode="manager"
              onPrimaryAction={() => onSelectSurveyResults(survey.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
