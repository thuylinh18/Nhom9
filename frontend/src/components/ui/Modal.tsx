import React, { useEffect } from 'react';
import { Button } from './Button';

export interface ModalProps {
  isOpen?: boolean;
  title: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger' | 'ai';
  loading?: boolean;
  maxWidth?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen = true,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  loading = false,
  maxWidth = '500px',
  onConfirm,
  onCancel,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
    >
      <div
        className="modal-dialog"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-heading" className="modal-title">
            {title}
          </h2>
        </div>

        {description && (
          <div className="modal-body">
            {typeof description === 'string' ? (
              <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                {description}
              </p>
            ) : (
              description
            )}
          </div>
        )}

        {children}

        <div className="modal-actions">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
            style={{ minWidth: '110px' }}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant={confirmVariant}
            onClick={onConfirm}
            loading={loading}
            style={{ minWidth: '110px' }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
