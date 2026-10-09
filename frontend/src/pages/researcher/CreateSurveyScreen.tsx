import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Survey } from '../../types';
import { api } from '../../services/api';

export interface CreateSurveyScreenProps {
  onSuccess: (survey: Survey) => void;
  onCancel: () => void;
}

export const CreateSurveyScreen: React.FC<CreateSurveyScreenProps> = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Survey title is required.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const created = await api.createSurvey({ title: title.trim(), description: description.trim() });
      onSuccess(created);
    } catch (err: any) {
      setError(err.message || 'Failed to create survey.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Create Survey
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Start with the basics. You will be able to add questions in the next step.
        </p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <Card style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit}>
          <Input
            label="Survey Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Customer Service Feedback Survey"
            disabled={loading}
          />

          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell respondents what this survey is about and how their feedback will help..."
            rows={4}
            disabled={loading}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid var(--color-border-light)'
            }}
          >
            <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              Create Survey
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
