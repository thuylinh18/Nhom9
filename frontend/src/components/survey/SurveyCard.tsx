import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ClipboardList, ArrowRight, Edit3, Send } from 'lucide-react';
import { Survey } from '../../types';

export interface SurveyCardProps {
  survey: Survey;
  mode: 'researcher' | 'respondent' | 'manager';
  onPrimaryAction?: (survey: Survey) => void;
  onSecondaryAction?: (survey: Survey) => void;
}

export const SurveyCard: React.FC<SurveyCardProps> = ({
  survey,
  mode,
  onPrimaryAction,
  onSecondaryAction
}) => {
  const questionCount = survey.questions_count ?? (survey.questions ? survey.questions.length : 0);
  const responseCount = survey.response_count ?? 0;
  const isDraft = survey.status.toUpperCase() === 'DRAFT';
  const isPublished = survey.status.toUpperCase() === 'PUBLISHED';

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        height: '100%'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-8)',
              backgroundColor: isPublished ? 'var(--color-ai-accent-tint)' : '#eef2ef',
              color: isPublished ? 'var(--color-secondary)' : 'var(--color-text-muted)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0
            }}
          >
            <ClipboardList size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              {survey.title}
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {survey.description || 'No description provided.'}
            </p>
          </div>
        </div>
        <Badge type={survey.status} />
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid var(--color-border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
          color: 'var(--color-text-muted)'
        }}
      >
        <span>
          {questionCount} question{questionCount !== 1 ? 's' : ''}
          {mode !== 'respondent' && ` · ${responseCount} response${responseCount !== 1 ? 's' : ''}`}
          {mode === 'respondent' && ' · ~2 min'}
        </span>

        <div style={{ display: 'flex', gap: '8px' }}>
          {mode === 'researcher' && isDraft && (
            <Button
              variant="secondary"
              size="sm"
              icon={<Edit3 size={14} />}
              onClick={() => onSecondaryAction && onSecondaryAction(survey)}
            >
              Edit
            </Button>
          )}

          {mode === 'researcher' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onPrimaryAction && onPrimaryAction(survey)}
            >
              Manage
            </Button>
          )}

          {mode === 'respondent' && (
            <Button
              variant="primary"
              size="sm"
              icon={<Send size={14} />}
              onClick={() => onPrimaryAction && onPrimaryAction(survey)}
            >
              Start Survey
            </Button>
          )}

          {mode === 'manager' && (
            <Button
              variant="secondary"
              size="sm"
              icon={<ArrowRight size={14} />}
              onClick={() => onPrimaryAction && onPrimaryAction(survey)}
            >
              View Results
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
