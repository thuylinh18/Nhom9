import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/MetricsAndStates';
import { QuestionCard } from '../../components/question/QuestionCard';
import { Survey, Question, QuestionType } from '../../types';
import { api } from '../../services/api';
import { Plus, ChevronLeft, Send, Eye } from 'lucide-react';

export interface QuestionManagementScreenProps {
  survey: Survey;
  onUpdateSurvey: (updated: Survey) => void;
  onBack: () => void;
  onPreview: (survey: Survey) => void;
}

export const QuestionManagementScreen: React.FC<QuestionManagementScreenProps> = ({
  survey,
  onUpdateSurvey,
  onBack,
  onPreview
}) => {
  const [questions, setQuestions] = useState<Question[]>(survey.questions || []);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Add Question Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<QuestionType>('Rating');
  const [newQuestionRequired, setNewQuestionRequired] = useState(true);
  const [newQuestionOptions, setNewQuestionOptions] = useState('Excellent, Good, Fair, Poor');

  // Confirmation Modals
  // SCR-006: Publish Modal
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  // SCR-007: Close Modal
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const isDraft = survey.status.toUpperCase() === 'DRAFT';
  const isPublished = survey.status.toUpperCase() === 'PUBLISHED';

  // Handle Add Question
  const handleAddQuestion = async () => {
    if (!newQuestionText.trim()) {
      setNotice({ type: 'error', message: 'Question text is required.' });
      return;
    }

    const optionsArray =
      newQuestionType.toLowerCase().includes('choice')
        ? newQuestionOptions
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    try {
      setLoading(true);
      const createdQ = await api.addQuestion(survey.id, {
        text: newQuestionText.trim(),
        type: newQuestionType,
        question_type: newQuestionType,
        required: newQuestionRequired,
        is_required: newQuestionRequired,
        options: optionsArray
      });

      const updatedQuestions = [...questions, createdQ];
      setQuestions(updatedQuestions);
      const updatedSurvey = {
        ...survey,
        questions: updatedQuestions,
        questions_count: updatedQuestions.length
      };
      onUpdateSurvey(updatedSurvey);

      // Reset modal
      setNewQuestionText('');
      setNewQuestionType('Rating');
      setNewQuestionRequired(true);
      setIsAddModalOpen(false);
      setNotice({ type: 'success', message: 'Question added successfully.' });
    } catch (err: any) {
      setNotice({ type: 'error', message: err.message || 'Failed to add question.' });
    } finally {
      setLoading(false);
    }
  };

  // SCR-006: Publish Survey flow (enforces BR-012: Survey must have >= 1 question)
  const handleAttemptPublish = () => {
    if (questions.length === 0) {
      setNotice({
        type: 'error',
        message: 'Survey must have at least one question before it can be published (BR-012).'
      });
      return;
    }
    setIsPublishModalOpen(true);
  };

  const handleConfirmPublish = async () => {
    try {
      setLoading(true);
      const updated = await api.publishSurvey(survey.id);
      setIsPublishModalOpen(false);
      onUpdateSurvey({ ...updated, questions });
      setNotice({ type: 'success', message: 'Survey published successfully! Respondents can now take this survey.' });
    } catch (err: any) {
      setNotice({ type: 'error', message: err.message || 'Failed to publish survey.' });
    } finally {
      setLoading(false);
    }
  };

  // SCR-007: Close Survey flow
  const handleConfirmClose = async () => {
    try {
      setLoading(true);
      const updated = await api.closeSurvey(survey.id);
      setIsCloseModalOpen(false);
      onUpdateSurvey({ ...updated, questions });
      setNotice({ type: 'info', message: 'Survey has been closed. No further responses will be accepted (BR-002).' });
    } catch (err: any) {
      setNotice({ type: 'error', message: err.message || 'Failed to close survey.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Back button */}
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
        Back to survey list
      </button>

      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {survey.title}
            </h2>
            <Badge type={survey.status} />
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            {questions.length} question{questions.length !== 1 ? 's' : ''} in this survey
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="secondary"
            icon={<Eye size={16} />}
            onClick={() => onPreview({ ...survey, questions })}
          >
            Preview
          </Button>

          {isDraft && (
            <Button
              variant="primary"
              icon={<Send size={16} />}
              onClick={handleAttemptPublish}
            >
              Publish Survey
            </Button>
          )}

          {isPublished && (
            <Button
              variant="danger"
              onClick={() => setIsCloseModalOpen(true)}
            >
              Close Survey
            </Button>
          )}
        </div>
      </div>

      {notice && <Alert type={notice.type} message={notice.message} onClose={() => setNotice(null)} />}

      {/* Toolbar for Questions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          Questions
        </h3>
        {isDraft && (
          <Button
            variant="secondary"
            size="sm"
            icon={<Plus size={16} />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Question
          </Button>
        )}
      </div>

      {/* Question List or Empty State */}
      {questions.length === 0 ? (
        <EmptyState
          title="No questions yet"
          description="Add a question to start building your survey."
          actionText={isDraft ? 'Add Question' : undefined}
          onAction={isDraft ? () => setIsAddModalOpen(true) : undefined}
        />
      ) : (
        <div>
          {questions.map((q, idx) => (
            <QuestionCard
              key={q.id || idx}
              question={q}
              index={idx}
              mode={isDraft ? 'edit' : 'preview'}
            />
          ))}
        </div>
      )}

      {/* MODAL: ADD QUESTION (SCR-005) */}
      <Modal
        isOpen={isAddModalOpen}
        title="Add Question"
        maxWidth="540px"
        confirmText="Save Question"
        cancelText="Cancel"
        loading={loading}
        onConfirm={handleAddQuestion}
        onCancel={() => setIsAddModalOpen(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
          <Input
            label="Question Text"
            required
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="e.g. How satisfied are you with our service?"
          />

          <Select
            label="Question Type"
            value={newQuestionType}
            onChange={(e) => setNewQuestionType(e.target.value as QuestionType)}
            options={[
              { label: 'Rating (1 - 5 stars)', value: 'Rating' },
              { label: 'Multiple choice', value: 'Multiple choice' },
              { label: 'Text (Open comment)', value: 'Text' }
            ]}
          />

          {newQuestionType.toLowerCase().includes('choice') && (
            <Input
              label="Options (comma separated)"
              value={newQuestionOptions}
              onChange={(e) => setNewQuestionOptions(e.target.value)}
              helperText="Separate multiple choices with commas (e.g. Excellent, Good, Fair, Poor)"
            />
          )}

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px', marginBottom: '8px' }}>
            <label
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                userSelect: 'none',
                lineHeight: 1
              }}
            >
              <input
                type="checkbox"
                checked={newQuestionRequired}
                onChange={(e) => setNewQuestionRequired(e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--color-secondary)',
                  margin: 0,
                  cursor: 'pointer',
                  verticalAlign: 'middle'
                }}
              />
              <span>Required question</span>
            </label>
          </div>
        </div>
      </Modal>

      {/* MODAL: SCR-006 PUBLISH SURVEY CONFIRMATION */}
      <Modal
        isOpen={isPublishModalOpen}
        title="Publish this survey?"
        maxWidth="480px"
        description={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--color-text-primary)' }}>
              Are you sure you want to publish this survey?
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Once published, respondents will be able to access and submit responses.
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              You will not be able to edit survey questions while in published status.
            </p>
          </div>
        }
        confirmText="Publish Survey"
        confirmVariant="primary"
        loading={loading}
        onConfirm={handleConfirmPublish}
        onCancel={() => setIsPublishModalOpen(false)}
      />

      {/* MODAL: SCR-007 CLOSE SURVEY CONFIRMATION */}
      <Modal
        isOpen={isCloseModalOpen}
        title="Close this survey?"
        maxWidth="480px"
        description={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--color-text-primary)' }}>
              Are you sure you want to close this survey?
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Respondents will no longer be able to submit new responses (BR-002).
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              All existing responses, customer feedback, and analytics will remain preserved.
            </p>
          </div>
        }
        confirmText="Close Survey"
        confirmVariant="danger"
        loading={loading}
        onConfirm={handleConfirmClose}
        onCancel={() => setIsCloseModalOpen(false)}
      />
    </div>
  );
};
