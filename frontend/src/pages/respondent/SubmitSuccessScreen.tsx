import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Check } from 'lucide-react';

export interface SubmitSuccessScreenProps {
  onBackToSurveys: () => void;
}

export const SubmitSuccessScreen: React.FC<SubmitSuccessScreenProps> = ({ onBackToSurveys }) => {
  return (
    <div style={{ maxWidth: '540px', margin: '48px auto 0' }}>
      <Card style={{ padding: '48px 32px', textAlign: 'center' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 20px'
          }}
        >
          <Check size={36} strokeWidth={2.5} />
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Your response has been submitted
        </h2>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.5, marginBottom: '28px' }}>
          Thank you for taking the time to share your feedback. Your response and comments have been recorded securely.
        </p>

        <Button variant="primary" onClick={onBackToSurveys}>
          View Available Surveys
        </Button>
      </Card>
    </div>
  );
};
