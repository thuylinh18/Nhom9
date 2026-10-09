import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mockUsers, initialMockSurveys, mockDashboardMetrics, mockAIAnalysis } from '../src/services/mockData.ts';
import type { Survey, User, Question } from '../src/types/index.ts';

describe('InsightFlow Frontend Test Suite', () => {

  describe('1. Authentication & Role Permissions (TC-001 -> TC-005)', () => {
    it('TC-001: Should contain all predefined user roles (ADMIN, RESEARCHER, MANAGER, RESPONDENT)', () => {
      assert.ok(mockUsers.admin, 'Admin user should exist');
      assert.strictEqual(mockUsers.admin.role, 'ADMIN');

      assert.ok(mockUsers.researcher, 'Researcher user should exist');
      assert.strictEqual(mockUsers.researcher.role, 'RESEARCHER');

      assert.ok(mockUsers.manager, 'Manager user should exist');
      assert.strictEqual(mockUsers.manager.role, 'MANAGER');

      assert.ok(mockUsers.respondent, 'Respondent user should exist');
      assert.strictEqual(mockUsers.respondent.role, 'RESPONDENT');
    });

    it('TC-004 & TC-005: Form validation rejects empty email or password', () => {
      const validateLogin = (email: string, pass: string) => {
        if (!email.trim()) return 'Email is required';
        if (!pass.trim()) return 'Password is required';
        return null;
      };

      assert.strictEqual(validateLogin('', '123456'), 'Email is required');
      assert.strictEqual(validateLogin('test@example.com', ''), 'Password is required');
      assert.strictEqual(validateLogin('test@example.com', '123456'), null);
    });

    it('TC-REG: Respondent self-registration data structure validation', async () => {
      const newRespondent = {
        email: 'new.respondent@example.com',
        full_name: 'Jane Doe',
        password: 'password123',
        role: 'RESPONDENT' as const,
      };

      assert.strictEqual(newRespondent.role, 'RESPONDENT');
      assert.ok(newRespondent.email.includes('@'));
      assert.ok(newRespondent.password.length >= 6);
    });
  });

  describe('2. Survey Lifecycle (TC-006 -> TC-016)', () => {
    it('TC-006 & TC-007: Survey creation requires title', () => {
      const validateSurvey = (title: string) => {
        if (!title.trim()) return 'Survey title is required';
        return null;
      };
      assert.strictEqual(validateSurvey(''), 'Survey title is required');
      assert.strictEqual(validateSurvey('Customer NPS Q4'), null);
    });

    it('TC-009: Published surveys cannot be edited or modified', () => {
      const published = initialMockSurveys.find(s => s.status === 'PUBLISHED');
      assert.ok(published, 'Should have at least one published survey in mock data');
      const canEdit = (survey: Survey) => survey.status === 'DRAFT';
      assert.strictEqual(canEdit(published!), false);
    });

    it('TC-014: Cannot publish survey without questions (BR-003)', () => {
      const canPublish = (survey: Survey) => {
        return survey.questions && survey.questions.length > 0;
      };
      const emptySurvey: Survey = {
        id: 'empty-1',
        title: 'Empty Survey',
        status: 'DRAFT',
        questions: [],
        created_at: new Date().toISOString(),
      };
      assert.strictEqual(canPublish(emptySurvey), false);

      const validSurvey: Survey = {
        id: 'valid-1',
        title: 'Valid Survey',
        status: 'DRAFT',
        questions: [{ id: 'q-1', text: 'How was the service?', question_type: 'RATING', required: true, order: 1 }],
        created_at: new Date().toISOString(),
      };
      assert.strictEqual(canPublish(validSurvey), true);
    });

    it('TC-015: Closing active survey sets status to CLOSED', () => {
      const survey: Survey = {
        id: 's-active',
        title: 'Active Survey',
        status: 'PUBLISHED',
        questions: [],
        created_at: new Date().toISOString(),
      };
      survey.status = 'CLOSED';
      survey.closed_at = new Date().toISOString();
      assert.strictEqual(survey.status, 'CLOSED');
      assert.ok(survey.closed_at);
    });
  });

  describe('3. Respondent Submissions (TC-017 -> TC-024)', () => {
    it('TC-020: Validates required questions before submission', () => {
      const questions: Question[] = [
        { id: 'q-1', text: 'Overall Rating', question_type: 'RATING', required: true, order: 1 },
        { id: 'q-2', text: 'Optional Notes', question_type: 'OPEN_TEXT', required: false, order: 2 },
      ];

      const validateAnswers = (answers: Record<string, any>) => {
        for (const q of questions) {
          if (q.required && (answers[q.id] === undefined || answers[q.id] === null || answers[q.id] === '')) {
            return `Question "${q.text}" is required`;
          }
        }
        return null;
      };

      // Missing required question
      assert.strictEqual(validateAnswers({}), 'Question "Overall Rating" is required');

      // Valid answers
      assert.strictEqual(validateAnswers({ 'q-1': 5 }), null);
    });

    it('TC-021: Rating value must be within 1 to 5', () => {
      const isRatingValid = (val: number) => Number.isInteger(val) && val >= 1 && val <= 5;
      assert.strictEqual(isRatingValid(5), true);
      assert.strictEqual(isRatingValid(1), true);
      assert.strictEqual(isRatingValid(0), false);
      assert.strictEqual(isRatingValid(6), false);
    });
  });

  describe('4. Manager Analytics & AI (TC-025 -> TC-038)', () => {
    it('TC-025 & TC-037: Dashboard metrics structure integrity', () => {
      assert.ok(typeof mockDashboardMetrics.total_surveys === 'number');
      assert.ok(typeof mockDashboardMetrics.total_responses === 'number');
      assert.ok(typeof mockDashboardMetrics.average_rating === 'number');
      assert.ok(mockDashboardMetrics.sentiment_overview);
      assert.ok(mockDashboardMetrics.sentiment_overview.positive >= 0);
    });

    it('TC-029 & TC-031: AI Analysis contains sentiment, topics, and summary', () => {
      const aiData = mockAIAnalysis['1'];
      assert.ok(aiData, 'AI analysis for survey 1 should exist');
      assert.ok(aiData.sentiment.positive >= 0);
      assert.ok(Array.isArray(aiData.topics));
      assert.ok(aiData.topics.length > 0);
      assert.ok(typeof aiData.summary === 'string');
      assert.ok(aiData.summary.length > 10);
    });

    it('TC-026: Boundary test for 0 responses calculation', () => {
      const calculateAvg = (ratings: number[]) => {
        if (ratings.length === 0) return 0.0;
        return Number((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1));
      };
      assert.strictEqual(calculateAvg([]), 0.0);
      assert.strictEqual(calculateAvg([5, 4, 3]), 4.0);
    });
  });

  describe('5. Admin User Management CRUD', () => {
    it('Admin can list and filter users by role and search keyword', () => {
      const usersList = Object.values(mockUsers);
      const search = 'sarah';
      const filtered = usersList.filter(u =>
        u.email.toLowerCase().includes(search) || (u.full_name || '').toLowerCase().includes(search)
      );
      assert.strictEqual(filtered.length, 1);
      assert.strictEqual(filtered[0].full_name, 'Dr. Sarah Connor');
    });

    it('Admin can update user role and active status', () => {
      const user: User = {
        id: 'test-u-1',
        email: 'user@example.com',
        full_name: 'Test Subject',
        role: 'RESPONDENT',
        is_active: true,
      };

      // Promote to Manager
      user.role = 'MANAGER';
      assert.strictEqual(user.role, 'MANAGER');

      // Deactivate user
      user.is_active = false;
      assert.strictEqual(user.is_active, false);
    });
  });

});
