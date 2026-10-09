export type UserRole = 'ADMIN' | 'RESEARCHER' | 'RESPONDENT' | 'MANAGER';

export interface User {
  id: string | number;
  email: string;
  full_name?: string;
  role: UserRole;
  is_active?: boolean;
  created_at?: string;
}

export type SurveyStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'Draft' | 'Published' | 'Closed';

export type QuestionType = 'Rating' | 'Multiple choice' | 'Text' | 'rating' | 'multiple_choice' | 'text';

export interface Question {
  id: string | number;
  survey_id?: string | number;
  text: string;
  question_type?: string;
  type?: string;
  required?: boolean;
  is_required?: boolean;
  order?: number;
  options?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Survey {
  id: string | number;
  title: string;
  description?: string;
  status: SurveyStatus;
  creator_id?: string | number;
  creator_email?: string;
  questions?: Question[];
  questions_count?: number;
  response_count?: number;
  closed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AnswerPayload {
  question_id: string | number;
  rating_value?: number | null;
  selected_option?: string | null;
  text_value?: string | null;
}

export interface FeedbackItem {
  id: string | number;
  survey_id?: string | number;
  response_id?: string | number;
  respondent_name?: string;
  text: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative' | 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  created_at?: string;
}

export interface AIAnalysisResult {
  id?: string | number;
  survey?: string | number;
  survey_id?: string | number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topics: string[];
  summary: string;
  total_feedback_analyzed?: number;
  updated_at?: string;
}

export interface SurveyAnalyticsData {
  survey_id: string | number;
  survey_title?: string;
  response_count: number;
  average_rating: number;
  rating_distribution: {
    [key: string]: number;
  };
  sentiment_distribution?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topics?: string[];
  recent_feedback?: FeedbackItem[];
}

export interface DashboardMetrics {
  total_surveys: number;
  total_responses: number;
  average_rating: number;
  positive_sentiment_percent: number;
  sentiment_overview: {
    positive: number;
    neutral: number;
    negative: number;
  };
  top_topics: string[];
}

/* Specific ViewModels */
export interface SurveyCardViewModel {
  id: string | number;
  title: string;
  description: string;
  status: SurveyStatus;
  questionCount: number;
  responseCount: number;
  createdAt?: string;
}

export interface SurveyDetailViewModel {
  survey: Survey;
  estimatedMinutes: number;
  isTaking: boolean;
}

export interface QuestionViewModel {
  id: string | number;
  orderNumber: number;
  text: string;
  type: QuestionType;
  required: boolean;
  options: string[];
  currentValue?: any;
  error?: string;
}

export interface SurveyResultViewModel {
  surveyId: string | number;
  surveyTitle: string;
  publishedDate?: string;
  totalResponses: number;
  averageRating: number;
  positivePercent: number;
  ratingDistribution: Array<{ label: string; count: number; percentage: number }>;
  recentFeedback: FeedbackItem[];
}

export interface FeedbackViewModel {
  surveyId: string | number;
  surveyTitle: string;
  feedbacks: FeedbackItem[];
  totalCount: number;
}

export interface AIAnalysisViewModel {
  surveyId: string | number;
  surveyTitle: string;
  sentiment: { positive: number; neutral: number; negative: number };
  topics: string[];
  summary: string;
  responseCount: number;
}

export interface DashboardViewModel {
  metrics: DashboardMetrics;
  recentSurveys: Survey[];
}
