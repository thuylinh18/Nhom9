import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar, LoadingSkeleton } from '../../components/ui/MetricsAndStates';
import { AIHero } from '../../components/ai/AIHero';
import { AIAnalysisResult, Survey } from '../../types';
import { api } from '../../services/api';
import { ChevronLeft, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export interface AIAnalysisScreenProps {
  surveyId: string | number;
  onBack: () => void;
}

export const AIAnalysisScreen: React.FC<AIAnalysisScreenProps> = ({ surveyId, onBack }) => {
  const [aiData, setAiData] = useState<AIAnalysisResult | null>(null);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const loadAIAnalysis = async () => {
    try {
      setLoading(true);
      setError(false);
      const [ai, s] = await Promise.all([
        api.getSurveyAIAnalysis(surveyId),
        api.getSurvey(surveyId).catch(() => null)
      ]);
      setAiData(ai);
      setSurvey(s);
    } catch {
      // User-friendly error per SCR-014 spec
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshAI = async () => {
    try {
      setRefreshing(true);
      setError(false);
      const updated = await api.triggerAIAnalysis(surveyId);
      setAiData(updated);
    } catch {
      setError(true);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAIAnalysis();
  }, [surveyId]);

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
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
        Back to survey results
      </button>

      {/* AI Hero Banner */}
      <AIHero
        title={survey?.title || 'Customer Service Feedback Survey'}
        subtitle={`Analysis based on ${aiData?.total_feedback_analyzed ?? 3} stored feedback responses`}
        badgeText="AI FEEDBACK ANALYSIS"
        action={
          <Button
            variant="ai"
            size="sm"
            loading={refreshing}
            icon={<RefreshCw size={14} />}
            onClick={handleRefreshAI}
          >
            Refresh AI
          </Button>
        }
      />

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : error ? (
        /* Friendly UX error state for AI without technical details */
        <Card style={{ padding: '40px 32px', textAlign: 'center', borderColor: '#f6cbc7', backgroundColor: '#fffbfb' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-error-bg)',
              color: 'var(--color-error)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 16px'
            }}
          >
            <AlertCircle size={26} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-error)', marginBottom: '8px' }}>
            AI analysis is temporarily unavailable.
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '440px', margin: '0 auto 20px' }}>
            We could not complete the automated sentiment and topic extraction at this moment.
          </p>
          <Button variant="secondary" onClick={loadAIAnalysis}>
            Try Again
          </Button>
        </Card>
      ) : aiData ? (
        <div>
          {/* Split Cards: Sentiment & Topics */}
          <div className="grid-cols-2" style={{ marginBottom: '24px' }}>
            {/* Sentiment Analysis */}
            <Card style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                Sentiment Analysis
              </h3>
              <ProgressBar
                label="Positive"
                percentage={aiData.sentiment.positive}
                color="green"
              />
              <ProgressBar
                label="Neutral"
                percentage={aiData.sentiment.neutral}
                color="gray"
              />
              <ProgressBar
                label="Negative"
                percentage={aiData.sentiment.negative}
                color="red"
              />
            </Card>

            {/* Topics Found */}
            <Card style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Topics Found</h3>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  Categorized by AI
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {aiData.topics.map((topic) => (
                  <span
                    key={topic}
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '13px',
                      fontWeight: 500
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* AI Executive Summary Card */}
          <Card
            style={{
              padding: '28px',
              backgroundColor: 'var(--color-white)',
              borderLeft: '4px solid var(--color-ai-accent)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-6)',
                  backgroundColor: 'var(--color-ai-accent-tint)',
                  color: 'var(--color-main)',
                  display: 'grid',
                  placeItems: 'center'
                }}
              >
                <Sparkles size={18} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                AI Summary
              </h3>
            </div>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--color-text-primary)',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              {aiData.summary}
            </p>
          </Card>
        </div>
      ) : null}
    </div>
  );
};
