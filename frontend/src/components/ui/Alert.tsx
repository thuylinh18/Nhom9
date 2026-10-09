import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export interface AlertProps {
  type?: 'error' | 'success' | 'info';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type = 'error', message, onClose }) => {
  if (!message) return null;

  const Icon = type === 'success' ? CheckCircle2 : type === 'info' ? Info : AlertCircle;

  return (
    <div className={`alert-banner alert-${type}`}>
      <Icon size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
      <span style={{ flex: 1, fontWeight: 500 }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit' }}
          aria-label="Close notice"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
