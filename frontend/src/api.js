const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

// Token helpers
export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const getUserData = () => {
  const data = localStorage.getItem('user_data');
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setAuthSession = (access, refresh, user) => {
  if (access) localStorage.setItem('access_token', access);
  if (refresh) localStorage.setItem('refresh_token', refresh);
  if (user) localStorage.setItem('user_data', JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_data');
};

// Generic request handler
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getAccessToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  let response;
  try {
    response = await fetch(url, config);
  } catch (err) {
    throw new Error('Network error: Unable to reach backend server at ' + API_BASE);
  }

  // Handle 401 unauthorized - token expired
  if (response.status === 401) {
    // If not already trying to refresh or login
    if (!endpoint.includes('/auth/login/') && !endpoint.includes('/auth/refresh/')) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        // Retry with new token
        headers['Authorization'] = `Bearer ${getAccessToken()}`;
        return fetch(url, { ...config, headers }).then(r => handleResponse(r));
      } else {
        clearAuthSession();
      }
    }
  }

  return handleResponse(response);
}

async function handleResponse(response) {
  if (response.status === 204) {
    return { success: true };
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    if (typeof data === 'object' && data !== null) {
      message = data.detail || data.message || Object.values(data).flat().join(' ') || message;
    } else if (typeof data === 'string' && data.length < 200) {
      message = data;
    }
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

async function tryRefreshToken() {
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
    // Refresh failed
  }
  return false;
}

// ---------------- API Methods ---------------- //

export const api = {
  // Auth
  async login(email, password) {
    const data = await request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    setAuthSession(data.access, data.refresh, data.user);
    return data;
  },

  async register(email, password, full_name, role) {
    const data = await request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name, role })
    });
    setAuthSession(data.access, data.refresh, data.user);
    return data;
  },

  async getMe() {
    return request('/auth/me/');
  },

  logout() {
    clearAuthSession();
  },

  // Surveys
  async getSurveys() {
    return request('/surveys/');
  },

  async getAvailableSurveys() {
    return request('/surveys/available/');
  },

  async getSurvey(id) {
    return request(`/surveys/${id}/`);
  },

  async createSurvey(payload) {
    return request('/surveys/', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async updateSurvey(id, payload) {
    return request(`/surveys/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  },

  async deleteSurvey(id) {
    return request(`/surveys/${id}/`, {
      method: 'DELETE'
    });
  },

  async publishSurvey(id) {
    return request(`/surveys/${id}/publish/`, {
      method: 'POST'
    });
  },

  async closeSurvey(id) {
    return request(`/surveys/${id}/close/`, {
      method: 'POST'
    });
  },

  // Questions
  async addQuestion(surveyId, question) {
    return request(`/surveys/${surveyId}/questions/`, {
      method: 'POST',
      body: JSON.stringify({
        text: question.text,
        question_type: question.question_type || question.type,
        required: question.required ?? true,
        options: question.options || []
      })
    });
  },

  async deleteQuestion(surveyId, questionId) {
    return request(`/surveys/${surveyId}/questions/${questionId}/`, {
      method: 'DELETE'
    });
  },

  // Responses
  async submitSurvey(surveyId, answers, feedback_text = '') {
    // answers format: [{ question_id, rating_value, selected_option, text_value }]
    return request(`/surveys/${surveyId}/submit/`, {
      method: 'POST',
      body: JSON.stringify({
        answers,
        feedback_text
      })
    });
  },

  // Analytics (Manager)
  async getDashboard() {
    return request('/dashboard/');
  },

  async getSurveyResults(surveyId) {
    return request(`/surveys/${surveyId}/results/`);
  },

  async getSurveyFeedback(surveyId) {
    return request(`/surveys/${surveyId}/feedback/`);
  },

  async getSurveyAIAnalysis(surveyId) {
    return request(`/surveys/${surveyId}/ai-analysis/`);
  },

  async triggerAIAnalysis(surveyId) {
    return request(`/surveys/${surveyId}/ai-analysis/`, {
      method: 'POST'
    });
  }
};
