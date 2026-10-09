import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Question } from '../../types';
import { Trash2 } from 'lucide-react';

export interface QuestionCardProps {
  question: Question;
  index: number;
  mode: 'edit' | 'answer' | 'preview';
  value?: any;
  onChange?: (val: any) => void;
  onDelete?: (questionId: string | number) => void;
  error?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  mode,
  value,
  onChange,
  onDelete,
  error
}) => {
  const isRequired = question.required ?? question.is_required ?? false;
  const qType = (question.question_type || question.type || 'Rating').toLowerCase();

  // EDIT MODE (For Researcher Survey Editor)
  if (mode === 'edit') {
    return (
      <Card style={{ padding: '16px 20px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-6)',
              backgroundColor: '#eaf1ec',
              color: 'var(--color-secondary)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontSize: '13px'
            }}
          >
            {index + 1}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-text-primary)' }}>
              {question.text}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              {question.question_type || question.type} {isRequired ? '· Required' : '· Optional'}
              {question.options && question.options.length > 0 && ` (${question.options.length} options)`}
            </div>
          </div>
        </div>

        {onDelete && (
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 size={14} />}
            onClick={() => onDelete(question.id)}
            aria-label="Delete question"
          >
            Delete
          </Button>
        )}
      </Card>
    );
  }

  // ANSWER OR PREVIEW MODE (For Respondent taking survey or Researcher preview)
  return (
    <Card
      style={{
        padding: '24px',
        marginBottom: '20px',
        borderLeft: error ? '4px solid var(--color-error)' : '4px solid transparent'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {index + 1}. {question.text}{' '}
          {isRequired && <span style={{ color: 'var(--color-error)' }}>*</span>}
        </label>
        {error && (
          <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '4px' }}>
            {error}
          </p>
        )}
      </div>

      {/* RATING QUESTION */}
      {(qType.includes('rating') || qType === 'rating') && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map((score) => {
            const isSelected = value === score;
            return (
              <button
                key={score}
                type="button"
                disabled={mode === 'preview'}
                onClick={() => onChange && onChange(score)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-8)',
                  border: isSelected ? '2px solid var(--color-main)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-main)' : 'var(--color-white)',
                  color: isSelected ? 'var(--color-white)' : 'var(--color-text-primary)',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: mode === 'preview' ? 'default' : 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {score}
              </button>
            );
          })}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            <span>1 = Poor</span>
            <span>5 = Excellent</span>
          </div>
        </div>
      )}

      {/* MULTIPLE CHOICE QUESTION */}
      {(qType.includes('choice') || qType === 'multiple choice') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {(question.options && question.options.length > 0
            ? question.options
            : ['Excellent', 'Good', 'Fair', 'Poor']
          ).map((option) => {
            const isSelected = value === option;
            return (
              <label
                key={option}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-8)',
                  border: isSelected ? '1.5px solid var(--color-secondary)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? '#f2f8f4' : 'var(--color-white)',
                  cursor: mode === 'preview' ? 'default' : 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  disabled={mode === 'preview'}
                  checked={isSelected}
                  onChange={() => onChange && onChange(option)}
                  style={{ accentColor: 'var(--color-secondary)', width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      )}

      {/* TEXT / OPEN FEEDBACK QUESTION */}
      {(!qType.includes('rating') && !qType.includes('choice')) && (
        <textarea
          disabled={mode === 'preview'}
          value={value || ''}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          className="form-textarea"
          style={{ width: '100%' }}
        />
      )}
    </Card>
  );
};
