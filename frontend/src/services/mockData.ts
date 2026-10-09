import type { Survey, FeedbackItem, AIAnalysisResult, DashboardMetrics, User } from '../types/index.ts';

export const mockUsers: Record<string, User> = {
  admin: {
    id: 'user-admin-1',
    email: 'admin@insightflow.com',
    full_name: 'Administrator',
    role: 'ADMIN',
    created_at: '2026-06-01T08:00:00Z'
  },
  researcher: {
    id: 'user-res-1',
    email: 'researcher@insightflow.com',
    full_name: 'Dr. Sarah Connor',
    role: 'RESEARCHER',
    created_at: '2026-08-01T08:00:00Z'
  },
  respondent: {
    id: 'user-resp-1',
    email: 'alex.respondent@example.com',
    full_name: 'Alex Johnson',
    role: 'RESPONDENT',
    created_at: '2026-08-10T10:30:00Z'
  },
  manager: {
    id: 'user-mgr-1',
    email: 'manager@insightflow.com',
    full_name: 'David Chen',
    role: 'MANAGER',
    created_at: '2026-07-15T09:15:00Z'
  }
};

export const initialMockUserList: User[] = [
  mockUsers.admin,
  mockUsers.researcher,
  mockUsers.manager,
  mockUsers.respondent,
  {
    id: 'user-res-2',
    email: 'emily.researcher@insightflow.com',
    full_name: 'Emily Watson',
    role: 'RESEARCHER',
    created_at: '2026-08-15T11:00:00Z'
  },
  {
    id: 'user-mgr-2',
    email: 'robert.manager@insightflow.com',
    full_name: 'Robert Taylor',
    role: 'MANAGER',
    created_at: '2026-08-20T14:30:00Z'
  }
];

export const initialMockSurveys: Survey[] = [
  {
    id: '1',
    title: 'Customer Service Feedback Survey',
    description: 'Please provide feedback about your recent customer service experience.',
    status: 'PUBLISHED',
    creator_id: 'user-res-1',
    creator_email: 'researcher@insightflow.com',
    questions_count: 3,
    response_count: 3,
    created_at: '2026-08-20T14:00:00Z',
    updated_at: '2026-08-21T09:00:00Z',
    questions: [
      {
        id: 'q-1',
        survey_id: '1',
        text: 'How satisfied are you with our service?',
        question_type: 'Rating',
        type: 'Rating',
        required: true,
        is_required: true,
        options: []
      },
      {
        id: 'q-2',
        survey_id: '1',
        text: 'How would you rate the response time?',
        question_type: 'Multiple choice',
        type: 'Multiple choice',
        required: true,
        is_required: true,
        options: ['Excellent', 'Good', 'Fair', 'Poor']
      },
      {
        id: 'q-3',
        survey_id: '1',
        text: 'What could we improve?',
        question_type: 'Text',
        type: 'Text',
        required: false,
        is_required: false,
        options: []
      }
    ]
  },
  {
    id: '2',
    title: 'Product Feature Satisfaction Q3',
    description: 'Gathering insights regarding the newly released reporting dashboard.',
    status: 'DRAFT',
    creator_id: 'user-res-1',
    creator_email: 'researcher@insightflow.com',
    questions_count: 2,
    response_count: 0,
    created_at: '2026-08-28T11:20:00Z',
    updated_at: '2026-08-28T11:20:00Z',
    questions: [
      {
        id: 'q-201',
        survey_id: '2',
        text: 'How easy was it to navigate the new dashboard?',
        question_type: 'Rating',
        type: 'Rating',
        required: true,
        is_required: true,
        options: []
      },
      {
        id: 'q-202',
        survey_id: '2',
        text: 'Which feature do you use most frequently?',
        question_type: 'Multiple choice',
        type: 'Multiple choice',
        required: false,
        is_required: false,
        options: ['Analytics Charts', 'Export to PDF', 'Filter by Date', 'AI Insights']
      }
    ]
  },
  {
    id: '3',
    title: 'Website Usability & Onboarding',
    description: 'Quarterly review of customer onboarding experience on InsightFlow.',
    status: 'CLOSED',
    creator_id: 'user-res-1',
    creator_email: 'researcher@insightflow.com',
    questions_count: 4,
    response_count: 45,
    created_at: '2026-06-01T08:00:00Z',
    updated_at: '2026-07-01T18:00:00Z',
    questions: [
      {
        id: 'q-301',
        survey_id: '3',
        text: 'Rate your signup experience',
        question_type: 'Rating',
        type: 'Rating',
        required: true,
        is_required: true,
        options: []
      }
    ]
  }
];

export const mockFeedbacks: Record<string, FeedbackItem[]> = {
  '1': [
    {
      id: 'fb-1',
      survey_id: '1',
      response_id: 'resp-1',
      respondent_name: 'Response #001',
      text: 'Overall the service was good, but the response time was slow.',
      sentiment: 'Negative',
      created_at: 'Aug 30, 2026'
    },
    {
      id: 'fb-2',
      survey_id: '1',
      response_id: 'resp-2',
      respondent_name: 'Response #002',
      text: 'The staff were very helpful and friendly.',
      sentiment: 'Positive',
      created_at: 'Aug 30, 2026'
    },
    {
      id: 'fb-3',
      survey_id: '1',
      response_id: 'resp-3',
      respondent_name: 'Response #003',
      text: 'I had to wait too long before receiving support.',
      sentiment: 'Negative',
      created_at: 'Aug 29, 2026'
    }
  ]
};

export const mockAIAnalysis: Record<string, AIAnalysisResult> = {
  '1': {
    id: 'ai-1',
    survey: '1',
    survey_id: '1',
    sentiment: {
      positive: 33,
      neutral: 0,
      negative: 67
    },
    topics: ['Response Time', 'Customer Service', 'Staff Support'],
    summary: 'Most respondents were satisfied with staff support, but response time was a recurring concern.',
    total_feedback_analyzed: 3,
    updated_at: '2026-08-30T16:00:00Z'
  }
};

export const mockDashboardMetrics: DashboardMetrics = {
  total_surveys: 12,
  total_responses: 248,
  average_rating: 3.8,
  positive_sentiment_percent: 33,
  sentiment_overview: {
    positive: 33,
    neutral: 0,
    negative: 67
  },
  top_topics: ['Response Time', 'Customer Service', 'Staff Support']
};
