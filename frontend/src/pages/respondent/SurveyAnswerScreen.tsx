import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Modal } from '../../components/ui/Modal';
import { QuestionCard } from '../../components/question/QuestionCard';
import { Survey } from '../../types';
import { api } from '../../services/api';
import { ChevronLeft, Send, MessageSquare } from 'lucide-react';

export interface SurveyAnswerScreenProps {
  survey: Survey;
  onSubmitSuccess: () => void;
  onBack: () => void;
}

export const SurveyAnswerScreen: React.FC<SurveyAnswerScreenProps> = ({
  survey,
  onSubmitSuccess,
  onBack
}) => {
  const [answers, setAnswers] = useState<Record<string | number, any>>({});
  const [feedbackText, setFeedbackText] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string | number, string>>({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const questions = survey.questions || [];

  const handleAnswerChange = (questionId: string | number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    // Clear validation error if answered
    if (validationErrors[questionId]) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy[questionId];
        return copy;
      });
    }
  };

  // Pre-submit validation
  const handleAttemptSubmit = () => {
    const errors: Record<string | number, string> = {};
    let hasError = false;

    questions.forEach((q) => {
      const isRequired = q.required ?? q.is_required;
      if (isRequired) {
        const answer = answers[q.id];
        if (answer === undefined || answer === null || String(answer).trim() === '') {
          errors[q.id] = 'This question is required.';
          hasError = true;
        }
      }
    });

    if (hasError) {
      setValidationErrors(errors);
      setGeneralError('Please answer all required questions marked with an asterisk (*).');
      return;
    }

    setGeneralError('');
    setIsConfirmModalOpen(true);
  };

  // Submit confirmed
  const handleConfirmSubmit = async () => {
    try {
      setLoading(true);
      setGeneralError('');
      await api.submitSurvey(survey.id, answers, feedbackText.trim());
      setIsConfirmModalOpen(false);
      onSubmitSuccess();
    } catch (err: any) {
      setGeneralError(err.message || 'Failed to submit response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
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
        Back to available surveys
      </button>

      {/* Survey Title Card */}
      <Card style={{ padding: '32px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          {survey.title}
        </h1>
        {survey.description && (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.5 }}>
            {survey.description}
          </p>
        )}
        <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
          {questions.length} question{questions.length !== 1 ? 's' : ''} · Estimated completion time: ~2 minutes
        </div>
      </Card>

      {generalError && <Alert type="error" message={generalError} onClose={() => setGeneralError('')} />}

      {/* Questions Form */}
      <div>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id || index}
            question={question}
            index={index}
            mode="answer"
            value={answers[question.id]}
            onChange={(val) => handleAnswerChange(question.id, val)}
            error={validationErrors[question.id]}
          />
        ))}

        {/* Optional general feedback text for AI Sentiment & Topic analysis */}
        <Card style={{ padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <MessageSquare size={18} color="var(--color-secondary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Additional Customer Feedback (Optional)
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
            Do you have any suggestions, comments or compliments to share with our service team?
          </p>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Share any additional thoughts about your experience..."
            rows={4}
            className="form-textarea"
            style={{ width: '100%' }}
          />
        </Card>

        {/* Submit CTA */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
          <Button
            variant="primary"
            size="lg"
            icon={<Send size={18} />}
            onClick={handleAttemptSubmit}
          >
            Submit Response
          </Button>
        </div>
      </div>

      {/* SCR-010: SUBMIT CONFIRMATION MODAL */}
      <Modal
        isOpen={isConfirmModalOpen}
        title="Submit your response?"
        description="Are you sure you are ready to submit? You will not be able to edit your answers once submitted (BR-004)."
        confirmText="Submit Response"
        confirmVariant="primary"
        loading={loading}
        onConfirm={handleConfirmSubmit}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
};
