import React, { useState, useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import { SurveyCard } from '../../components/survey/SurveyCard';
import { LoadingSkeleton, EmptyState, ErrorState } from '../../components/ui/MetricsAndStates';
import { Survey } from '../../types';
import { api } from '../../services/api';

export interface PublishedSurveyListProps {
  onSelectSurvey: (survey: Survey) => void;
}

export const PublishedSurveyList: React.FC<PublishedSurveyListProps> = ({ onSelectSurvey }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPublishedSurveys = async () => {
    try {
      setLoading(true);
      setError('');
      // Strictly loads published surveys only (enforcing BR-001)
      const data = await api.getAvailableSurveys();
      setSurveys(data);
    } catch (err: any) {
      setError(err.message || 'Could not load available surveys.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublishedSurveys();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Available Surveys
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Choose a survey below to share your feedback and help us improve.
        </p>
      </div>

      {loading ? (
        <LoadingSkeleton rows={2} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadPublishedSurveys} />
      ) : surveys.length === 0 ? (
        <EmptyState
          icon={<ClipboardList size={32} />}
          title="No surveys available"
          description="There are currently no active surveys open for responses. Please check back later."
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '24px'
          }}
        >
          {surveys.map((survey) => (
            <SurveyCard
              key={survey.id}
              survey={survey}
              mode="respondent"
              onPrimaryAction={() => onSelectSurvey(survey)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
