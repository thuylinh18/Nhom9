import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { AlertCircle, FolderPlus } from 'lucide-react';

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <Card key={i} style={{ padding: '24px' }}>
          <div
            style={{
              height: '20px',
              width: '45%',
              backgroundColor: '#e6ebe7',
              borderRadius: '4px',
              marginBottom: '12px',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          />
          <div
            style={{
              height: '14px',
              width: '80%',
              backgroundColor: '#edf2ee',
              borderRadius: '4px',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          />
        </Card>
      ))}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <Card style={{ padding: '48px 32px', textAlign: 'center', margin: '24px 0' }}>
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#EEF7F2',
          color: 'var(--color-secondary)',
          display: 'grid',
          placeItems: 'center',
          margin: '0 auto 16px'
        }}
      >
        {icon || <FolderPlus size={28} />}
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '440px', margin: '0 auto 24px' }}>
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Card>
  );
};

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We could not load the requested data. Please check your connection and try again.',
  onRetry
}) => {
  return (
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
        {title}
      </h3>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '440px', margin: '0 auto 20px' }}>
        {message}
      </p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Card>
  );
};

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  accent?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, subtext, accent }) => {
  return (
    <Card style={{ padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
      {accent && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: 'var(--color-ai-accent)'
          }}
        />
      )}
      <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
        {label}
      </p>
      <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
        {value}
      </div>
      {subtext && (
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
          {subtext}
        </p>
      )}
    </Card>
  );
};

export interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: 'green' | 'red' | 'blue' | 'gray' | 'orange';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage, color = 'green' }) => {
  const colorMap = {
    green: 'var(--color-secondary)',
    red: 'var(--color-error)',
    blue: '#3b82f6',
    gray: '#9ca3af',
    orange: 'var(--color-warning)'
  };

  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
        <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{label}</span>
        <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>{percentage}%</span>
      </div>
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e9edea',
          borderRadius: 'var(--radius-pill)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${Math.min(100, Math.max(0, percentage))}%`,
            height: '100%',
            backgroundColor: colorMap[color],
            borderRadius: 'var(--radius-pill)',
            transition: 'width 0.4s ease-out'
          }}
        />
      </div>
    </div>
  );
};
