import type {
  User,
  UserRole,
  Survey,
  Question,
  FeedbackItem,
  AIAnalysisResult,
  DashboardMetrics,
  SurveyAnalyticsData
} from '../types/index.ts';
import {
  initialMockSurveys,
  mockUsers,
  initialMockUserList,
  mockFeedbacks,
  mockAIAnalysis,
  mockDashboardMetrics
} from './mockData.ts';

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

// Token helpers
export const getAccessToken = (): string | null => localStorage.getItem('access_token');
export const getRefreshToken = (): string | null => localStorage.getItem('refresh_token');
export const getUserData = (): User | null => {
  const data = localStorage.getItem('user_data');
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setAuthSession = (access: string | null, refresh: string | null, user: User | null) => {
  if (access) localStorage.setItem('access_token', access);
  if (refresh) localStorage.setItem('refresh_token', refresh);
  if (user) localStorage.setItem('user_data', JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_data');
};

// In-memory fallback mock state (persists during page session)
let localSurveys: Survey[] = [...initialMockSurveys];
let localFeedbacks: Record<string, FeedbackItem[]> = { ...mockFeedbacks };
let localAI: Record<string, AIAnalysisResult> = { ...mockAIAnalysis };
let localUsers: User[] = [...initialMockUserList];

// Generic request handler
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {})
  };

  const token = getAccessToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 401 && !endpoint.includes('/auth/login/')) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        headers['Authorization'] = `Bearer ${getAccessToken()}`;
        const retryRes = await fetch(url, { ...config, headers });
        return handleResponse<T>(retryRes);
      } else {
        clearAuthSession();
      }
    }

    return await handleResponse<T>(response);
  } catch (err: any) {
    // If backend is offline, throw error with status 0 to allow fallback if desired
    const error = new Error(err.message || 'Network error');
    (error as any).status = 0;
    throw error;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return { success: true } as unknown as T;
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    if (typeof data === 'object' && data !== null) {
      const firstKey = Object.keys(data)[0];
      if (data.detail) {
        message = data.detail;
      } else if (data.message) {
        message = data.message;
      } else if (firstKey && Array.isArray((data as any)[firstKey])) {
        message = `${firstKey}: ${(data as any)[firstKey][0]}`;
      } else if (firstKey && typeof (data as any)[firstKey] === 'string') {
        message = `${firstKey}: ${(data as any)[firstKey]}`;
      } else {
        message = Object.values(data).flat().join(' ') || message;
      }
    } else if (typeof data === 'string' && data.length < 200) {
      message = data;
    }
    const error = new Error(message);
    (error as any).status = response.status;
    (error as any).data = data;
    throw error;
  }

  return data as T;
}

async function tryRefreshToken(): Promise<boolean> {
  const refresh = getRefreshToken();
  if (!refresh) return false;

  try {
    const res = await fetch(`${API_BASE}/auth/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.access) {
        localStorage.setItem('access_token', data.access);
        return true;
      }
    }
  } catch {
    // refresh failed
  }
  return false;
}

// ---------------- High-level API Service ---------------- //
export const api = {
  // Authentication
  async login(email: string, password?: string): Promise<{ user: User; access?: string }> {
    try {
      const res = await request<{ access: string; refresh: string; user: User }>('/auth/login/', {
        method: 'POST',
        body: JSON.stringify({ email, password: password || 'password' })
      });
      setAuthSession(res.access, res.refresh, res.user);
      return res;
    } catch {
      // Fallback for prototype / local demo mode
      const foundRole = Object.values(mockUsers).find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      const user: User = foundRole || {
        id: 'demo-user-1',
        email,
        full_name: email.split('@')[0],
        role: email.includes('resp') ? 'RESPONDENT' : email.includes('mgr') || email.includes('manager') ? 'MANAGER' : 'RESEARCHER'
      };
      setAuthSession('mock-token-xyz', 'mock-refresh-xyz', user);
      return { user, access: 'mock-token-xyz' };
    }
  },

  async register(
    email: string,
    password: string,
    full_name?: string,
    role: UserRole = 'RESPONDENT'
  ): Promise<{ user: User; access?: string }> {
    try {
      await request<any>('/auth/register/', {
        method: 'POST',
        body: JSON.stringify({ email, password, full_name: full_name || '', role })
      });
      return await api.login(email, password);
    } catch {
      // In-memory fallback
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        full_name: full_name || email.split('@')[0],
        role,
        created_at: new Date().toISOString()
      };
      localUsers = [newUser, ...localUsers];
      setAuthSession('mock-token-registered', 'mock-refresh-registered', newUser);
      return { user: newUser, access: 'mock-token-registered' };
    }
  },

  async loginAsRole(role: UserRole): Promise<User> {
    const roleKey = role.toLowerCase();
    const user = mockUsers[roleKey] || {
      id: `user-${roleKey}-1`,
      email: `${roleKey}@insightflow.com`,
      full_name: `${role.charAt(0) + role.slice(1).toLowerCase()} User`,
      role
    };
    setAuthSession('mock-token-' + roleKey, 'mock-refresh-' + roleKey, user);
    return user;
  },

  async getMe(): Promise<User> {
    try {
      return await request<User>('/auth/me/');
    } catch {
      const stored = getUserData();
      if (stored) return stored;
      throw new Error('Not authenticated');
    }
  },

  logout() {
    clearAuthSession();
  },

  // Surveys
  async getSurveys(): Promise<Survey[]> {
    try {
      const data = await request<any>('/surveys/');
      return Array.isArray(data) ? data : data?.results || [];
    } catch {
      return localSurveys;
    }
  },

  async getAvailableSurveys(): Promise<Survey[]> {
    try {
      const data = await request<any>('/surveys/available/');
      return Array.isArray(data) ? data : data?.results || [];
    } catch {
      return localSurveys.filter(s => s.status.toUpperCase() === 'PUBLISHED');
    }
  },

  async getSurvey(id: string | number): Promise<Survey> {
    try {
      return await request<Survey>(`/surveys/${id}/`);
    } catch {
      const found = localSurveys.find(s => String(s.id) === String(id));
      if (!found) throw new Error('Survey not found');
      return found;
    }
  },

  async createSurvey(payload: { title: string; description?: string }): Promise<Survey> {
    try {
      return await request<Survey>('/surveys/', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch {
      const newSurvey: Survey = {
        id: String(Date.now()),
        title: payload.title,
        description: payload.description || '',
        status: 'DRAFT',
        questions: [],
        questions_count: 0,
        response_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      localSurveys = [newSurvey, ...localSurveys];
      return newSurvey;
    }
  },

  async updateSurvey(id: string | number, payload: { title: string; description?: string }): Promise<Survey> {
    try {
      return await request<Survey>(`/surveys/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    } catch {
      const index = localSurveys.findIndex(s => String(s.id) === String(id));
      if (index === -1) throw new Error('Survey not found');
      localSurveys[index] = {
        ...localSurveys[index],
        title: payload.title,
        description: payload.description ?? localSurveys[index].description,
        updated_at: new Date().toISOString()
      };
      return localSurveys[index];
    }
  },

  async publishSurvey(id: string | number): Promise<Survey> {
    try {
      return await request<Survey>(`/surveys/${id}/publish/`, {
        method: 'POST'
      });
    } catch {
      const index = localSurveys.findIndex(s => String(s.id) === String(id));
      if (index === -1) throw new Error('Survey not found');
      const qCount = localSurveys[index].questions?.length || localSurveys[index].questions_count || 0;
      if (qCount === 0) {
        throw new Error('Survey must have at least one question before publishing.');
      }
      localSurveys[index] = {
        ...localSurveys[index],
        status: 'PUBLISHED',
        updated_at: new Date().toISOString()
      };
      return localSurveys[index];
    }
  },

  async closeSurvey(id: string | number): Promise<Survey> {
    try {
      return await request<Survey>(`/surveys/${id}/close/`, {
        method: 'POST'
      });
    } catch {
      const index = localSurveys.findIndex(s => String(s.id) === String(id));
      if (index === -1) throw new Error('Survey not found');
      localSurveys[index] = {
        ...localSurveys[index],
        status: 'CLOSED',
        updated_at: new Date().toISOString()
      };
      return localSurveys[index];
    }
  },

  // Questions
  async addQuestion(
    surveyId: string | number,
    question: { text: string; question_type?: string; type?: string; required?: boolean; is_required?: boolean; options?: string[] }
  ): Promise<Question> {
    try {
      return await request<Question>(`/surveys/${surveyId}/questions/`, {
        method: 'POST',
        body: JSON.stringify({
          text: question.text,
          question_type: question.question_type || question.type || 'Rating',
          required: question.required ?? question.is_required ?? true,
          options: question.options || []
        })
      });
    } catch {
      const surveyIndex = localSurveys.findIndex(s => String(s.id) === String(surveyId));
      if (surveyIndex === -1) throw new Error('Survey not found');
      const newQ: Question = {
        id: `q-${Date.now()}`,
        survey_id: surveyId,
        text: question.text,
        type: question.question_type || question.type || 'Rating',
        question_type: question.question_type || question.type || 'Rating',
        required: question.required ?? question.is_required ?? true,
        is_required: question.required ?? question.is_required ?? true,
        options: question.options || [],
        created_at: new Date().toISOString()
      };
      const curQuestions = localSurveys[surveyIndex].questions || [];
      localSurveys[surveyIndex] = {
        ...localSurveys[surveyIndex],
        questions: [...curQuestions, newQ],
        questions_count: curQuestions.length + 1
      };
      return newQ;
    }
  },

  // Submit response
  async submitSurvey(
    surveyId: string | number,
    answers: Record<string | number, any>,
    feedbackText: string = ''
  ): Promise<{ success: boolean; message: string }> {
    try {
      await request(`/surveys/${surveyId}/submit/`, {
        method: 'POST',
        body: JSON.stringify({ answers, feedback_text: feedbackText })
      });
      return { success: true, message: 'Response submitted successfully.' };
    } catch {
      // Mock submit store
      const surveyIndex = localSurveys.findIndex(s => String(s.id) === String(surveyId));
      if (surveyIndex !== -1) {
        localSurveys[surveyIndex].response_count = (localSurveys[surveyIndex].response_count || 0) + 1;
      }
      if (feedbackText.trim()) {
        const sid = String(surveyId);
        if (!localFeedbacks[sid]) localFeedbacks[sid] = [];
        localFeedbacks[sid].unshift({
          id: `fb-${Date.now()}`,
          survey_id: surveyId,
          respondent_name: `Response #${String(localFeedbacks[sid].length + 1).padStart(3, '0')}`,
          text: feedbackText,
          sentiment: 'Positive',
          created_at: 'Just now'
        });
      }
      return { success: true, message: 'Response submitted successfully.' };
    }
  },

  // Analytics & Dashboard (Manager)
  async getDashboard(): Promise<DashboardMetrics> {
    try {
      return await request<DashboardMetrics>('/dashboard/');
    } catch {
      return mockDashboardMetrics;
    }
  },

  async getSurveyResults(surveyId: string | number): Promise<SurveyAnalyticsData> {
    try {
      return await request<SurveyAnalyticsData>(`/surveys/${surveyId}/results/`);
    } catch {
      const survey = localSurveys.find(s => String(s.id) === String(surveyId));
      return {
        survey_id: surveyId,
        survey_title: survey?.title || 'Customer Service Feedback Survey',
        response_count: survey?.response_count || 3,
        average_rating: 3.7,
        rating_distribution: {
          '5 stars': 33,
          '4 stars': 33,
          '2 stars': 34
        },
        sentiment_distribution: {
          positive: 33,
          neutral: 0,
          negative: 67
        },
        topics: ['Response Time', 'Customer Service', 'Staff Support'],
        recent_feedback: localFeedbacks[String(surveyId)] || mockFeedbacks['1']
      };
    }
  },

  async getSurveyFeedback(surveyId: string | number): Promise<FeedbackItem[]> {
    try {
      const res = await request<any>(`/surveys/${surveyId}/feedback/`);
      return Array.isArray(res) ? res : res?.results || [];
    } catch {
      return localFeedbacks[String(surveyId)] || mockFeedbacks['1'] || [];
    }
  },

  async getSurveyAIAnalysis(surveyId: string | number): Promise<AIAnalysisResult> {
    try {
      return await request<AIAnalysisResult>(`/surveys/${surveyId}/ai-analysis/`);
    } catch {
      const sid = String(surveyId);
      if (localAI[sid]) return localAI[sid];
      return {
        id: `ai-${sid}`,
        survey: sid,
        survey_id: sid,
        sentiment: { positive: 33, neutral: 0, negative: 67 },
        topics: ['Response Time', 'Customer Service', 'Staff Support'],
        summary: 'Most respondents were satisfied with staff support, but response time was a recurring concern.',
        total_feedback_analyzed: 3,
        updated_at: new Date().toISOString()
      };
    }
  },

  async triggerAIAnalysis(surveyId: string | number): Promise<AIAnalysisResult> {
    try {
      return await request<AIAnalysisResult>(`/surveys/${surveyId}/ai-analysis/`, {
        method: 'POST'
      });
    } catch {
      const sid = String(surveyId);
      const updatedAI: AIAnalysisResult = {
        id: `ai-${Date.now()}`,
        survey: sid,
        survey_id: sid,
        sentiment: { positive: 45, neutral: 25, negative: 30 },
        topics: ['Response Time', 'Customer Service', 'Agent Helpfulness', 'UI Simplicity'],
        summary: 'Recent customer feedback highlights improved satisfaction with service response time and friendly support assistance.',
        total_feedback_analyzed: (localFeedbacks[sid] || []).length || 5,
        updated_at: new Date().toISOString()
      };
      localAI[sid] = updatedAI;
      return updatedAI;
    }
  },

  // User Management (Admin)
  async getUsers(search: string = '', roleFilter: string = ''): Promise<User[]> {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (roleFilter) params.append('role', roleFilter);
      const query = params.toString() ? `?${params.toString()}` : '';
      const res = await request<any>(`/auth/users/${query}`);
      return Array.isArray(res) ? res : res?.results || [];
    } catch {
      let filtered = [...localUsers];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          u => u.email.toLowerCase().includes(s) || (u.full_name && u.full_name.toLowerCase().includes(s))
        );
      }
      if (roleFilter) {
        filtered = filtered.filter(u => u.role.toUpperCase() === roleFilter.toUpperCase());
      }
      return filtered;
    }
  },

  async createUser(payload: { email: string; password?: string; full_name?: string; role: UserRole }): Promise<User> {
    try {
      return await request<User>('/auth/register/', {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password || 'password123',
          full_name: payload.full_name || '',
          role: payload.role
        })
      });
    } catch {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: payload.email,
        full_name: payload.full_name || payload.email.split('@')[0],
        role: payload.role,
        created_at: new Date().toISOString()
      };
      localUsers = [newUser, ...localUsers];
      return newUser;
    }
  },

  async updateUserRole(userId: string | number, role: UserRole): Promise<User> {
    try {
      return await request<User>(`/auth/users/${userId}/`, {
        method: 'PATCH',
        body: JSON.stringify({ role })
      });
    } catch {
      const index = localUsers.findIndex(u => String(u.id) === String(userId));
      if (index === -1) throw new Error('User not found');
      localUsers[index] = {
        ...localUsers[index],
        role
      };
      return localUsers[index];
    }
  },

  async deleteUser(userId: string | number): Promise<{ success: boolean }> {
    try {
      await request<any>(`/auth/users/${userId}/`, {
        method: 'DELETE'
      });
      return { success: true };
    } catch {
      localUsers = localUsers.filter(u => String(u.id) !== String(userId));
      return { success: true };
    }
  }
};
