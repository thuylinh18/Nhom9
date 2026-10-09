import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FeedbackItem } from '../../types';

export interface FeedbackCardProps {
  feedback: FeedbackItem;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <Card style={{ padding: '20px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)' }}>
            {feedback.respondent_name || 'Anonymous Response'}
          </span>
          {feedback.created_at && (
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginLeft: '10px' }}>
              {feedback.created_at}
            </span>
          )}
        </div>
        {feedback.sentiment && <Badge type={feedback.sentiment} size="sm" />}
      </div>
      <p
        style={{
          fontStyle: 'italic',
          color: 'var(--color-text-primary)',
          fontSize: '14px',
          lineHeight: '1.5',
          margin: 0
        }}
      >
        “{feedback.text}”
      </p>
    </Card>
  );
};
