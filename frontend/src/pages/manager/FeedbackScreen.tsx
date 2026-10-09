import React, { useState, useEffect } from 'react';
import { FeedbackCard } from '../../components/feedback/FeedbackCard';
import { Button } from '../../components/ui/Button';
import { LoadingSkeleton, EmptyState, ErrorState } from '../../components/ui/MetricsAndStates';
import { FeedbackItem, Survey } from '../../types';
import { api } from '../../services/api';
import { ChevronLeft, Sparkles, MessageSquare } from 'lucide-react';

export interface FeedbackScreenProps {
  surveyId: string | number;
  onBack: () => void;
  onViewAIAnalysis: (surveyId: string | number) => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  surveyId,
  onBack,
  onViewAIAnalysis
}) => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      setError('');
      const [fbList, s] = await Promise.all([
        api.getSurveyFeedback(surveyId),
        api.getSurvey(surveyId).catch(() => null)
      ]);
      setFeedbacks(fbList);
      setSurvey(s);
    } catch (err: any) {
      setError(err.message || 'Could not load feedback items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, [surveyId]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Customer Feedback
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            {feedbacks.length} response{feedbacks.length !== 1 ? 's' : ''} for {survey?.title || 'Survey'}
          </p>
        </div>

        <Button
          variant="ai"
          icon={<Sparkles size={16} />}
          onClick={() => onViewAIAnalysis(surveyId)}
        >
          AI Analysis
        </Button>
      </div>

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadFeedbacks} />
      ) : feedbacks.length === 0 ? (
        <EmptyState
          icon={<MessageSquare size={32} />}
          title="No feedback submitted yet"
          description="Customer responses with open feedback will appear here automatically once respondents complete this survey."
        />
      ) : (
        <div>
          {feedbacks.map((fb) => (
            <FeedbackCard key={fb.id} feedback={fb} />
          ))}
        </div>
      )}
    </div>
  );
};
