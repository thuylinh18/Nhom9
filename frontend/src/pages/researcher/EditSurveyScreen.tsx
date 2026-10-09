import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Survey } from '../../types';
import { api } from '../../services/api';
import { ChevronLeft, ArrowRight, Lock } from 'lucide-react';

export interface EditSurveyScreenProps {
  survey: Survey;
  onSaved: (updated: Survey) => void;
  onGoToQuestions: (survey: Survey) => void;
  onBack: () => void;
}

export const EditSurveyScreen: React.FC<EditSurveyScreenProps> = ({
  survey,
  onSaved,
  onGoToQuestions,
  onBack
}) => {
  const [title, setTitle] = useState(survey.title);
  const [description, setDescription] = useState(survey.description || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isDraft = survey.status.toUpperCase() === 'DRAFT';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDraft) {
      setError('Only DRAFT surveys can be edited.');
      return;
    }
    if (!title.trim()) {
      setError('Survey title is required.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const updated = await api.updateSurvey(survey.id, {
        title: title.trim(),
        description: description.trim()
      });
      setSuccess('Survey details updated successfully.');
      onSaved(updated);
    } catch (err: any) {
      setError(err.message || 'Failed to update survey.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
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
        Back to surveys
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Edit Survey
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Update survey metadata and manage questions.
          </p>
        </div>
        <Badge type={survey.status} />
      </div>

      {!isDraft && (
        <Alert
          type="info"
          message={`This survey is currently ${survey.status.toUpperCase()}. Live or closed surveys cannot be edited to maintain respondent data integrity.`}
        />
      )}

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      <Card style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit}>
          <Input
            label="Survey Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isDraft || loading}
          />

          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            disabled={!isDraft || loading}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid var(--color-border-light)'
            }}
          >
            <Button
              type="button"
              variant="secondary"
              icon={<ArrowRight size={16} />}
              onClick={() => onGoToQuestions(survey)}
            >
              Manage Questions ({survey.questions_count ?? (survey.questions?.length || 0)})
            </Button>

            {isDraft ? (
              <Button type="submit" variant="primary" loading={loading}>
                Save Changes
              </Button>
            ) : (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-text-muted)',
                  fontSize: '13px'
                }}
              >
                <Lock size={14} /> Locked for editing
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};
