import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { QuestionCard } from '../../components/question/QuestionCard';
import { Survey } from '../../types';
import { ChevronLeft, Send, Eye } from 'lucide-react';

export interface PreviewSurveyScreenProps {
  survey: Survey;
  onBack: () => void;
  onPublish: () => void;
}

export const PreviewSurveyScreen: React.FC<PreviewSurveyScreenProps> = ({
  survey,
  onBack,
  onPublish
}) => {
  const questions = survey.questions || [];
  const isDraft = survey.status.toUpperCase() === 'DRAFT';

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
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
        Back to question management
      </button>

      {/* Preview banner notification */}
      <div
        style={{
          backgroundColor: '#eff8f3',
          border: '1px solid #c9e6d4',
          borderRadius: 'var(--radius-8)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-secondary)' }}>
          <Eye size={18} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>
            Survey Preview Mode — This is how respondents will see your questions.
          </span>
        </div>

        {isDraft && (
          <Button variant="primary" size="sm" icon={<Send size={14} />} onClick={onPublish}>
            Publish Survey
          </Button>
        )}
      </div>

      {/* Survey Title Card */}
      <Card style={{ padding: '32px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          {survey.title}
        </h1>
        {survey.description && (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.5 }}>
            {survey.description}
          </p>
        )}
        <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
          {questions.length} question{questions.length !== 1 ? 's' : ''} · Estimated completion time: ~2 minutes
        </div>
      </Card>

      {/* Questions List */}
      <div>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id || index}
            question={question}
            index={index}
            mode="preview"
          />
        ))}
      </div>
    </div>
  );
};
