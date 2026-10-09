import React, { useState, useEffect } from 'react';
import { Plus, ClipboardList } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { SurveyCard } from '../../components/survey/SurveyCard';
import { LoadingSkeleton, EmptyState, ErrorState } from '../../components/ui/MetricsAndStates';
import { Survey } from '../../types';
import { api } from '../../services/api';

export interface ResearcherSurveyListProps {
  onCreateSurvey: () => void;
  onEditSurvey: (survey: Survey) => void;
  onManageSurvey: (survey: Survey) => void;
}

export const ResearcherSurveyList: React.FC<ResearcherSurveyListProps> = ({
  onCreateSurvey,
  onEditSurvey,
  onManageSurvey
}) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSurveys = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getSurveys();
      setSurveys(data);
    } catch (err: any) {
      setError(err.message || 'Could not load surveys.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSurveys();
  }, []);

  return (
    <div>
      {/* Header Toolbar */}
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
            Survey Dashboard
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Create and manage your customer feedback surveys.
          </p>
        </div>
        <Button variant="primary" icon={<Plus size={18} />} onClick={onCreateSurvey}>
          Create Survey
        </Button>
      </div>

      {/* State Rendering */}
      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : error ? (
        <ErrorState message={error} onRetry={loadSurveys} />
      ) : surveys.length === 0 ? (
        <EmptyState
          icon={<ClipboardList size={32} />}
          title="No surveys yet"
          description="Create your first survey to start collecting customer feedback."
          actionText="Create Survey"
          onAction={onCreateSurvey}
        />
      ) : (
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
              mode="researcher"
              onPrimaryAction={() => onManageSurvey(survey)}
              onSecondaryAction={() => onEditSurvey(survey)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
