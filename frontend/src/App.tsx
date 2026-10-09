import { useState, useEffect } from 'react';
import { User, UserRole, Survey } from './types';
import { getUserData, getAccessToken, clearAuthSession, api } from './services/api';
import { AppLayout } from './layouts/AppLayout';
import { LoginScreen } from './pages/LoginScreen';

// Admin screens
import { AdminUserManagementScreen } from './pages/admin/AdminUserManagementScreen';

// Researcher screens
import { ResearcherSurveyList } from './pages/researcher/ResearcherSurveyList';
import { CreateSurveyScreen } from './pages/researcher/CreateSurveyScreen';
import { EditSurveyScreen } from './pages/researcher/EditSurveyScreen';
import { QuestionManagementScreen } from './pages/researcher/QuestionManagementScreen';
import { PreviewSurveyScreen } from './pages/researcher/PreviewSurveyScreen';

// Respondent screens
import { PublishedSurveyList } from './pages/respondent/PublishedSurveyList';
import { SurveyAnswerScreen } from './pages/respondent/SurveyAnswerScreen';
import { SubmitSuccessScreen } from './pages/respondent/SubmitSuccessScreen';

// Manager screens
import { SurveyDashboardScreen } from './pages/manager/SurveyDashboardScreen';
import { SurveyResultsScreen } from './pages/manager/SurveyResultsScreen';
import { FeedbackScreen } from './pages/manager/FeedbackScreen';
import { AIAnalysisScreen } from './pages/manager/AIAnalysisScreen';

export default function App() {
  const [user, setUser] = useState<User | null>(getUserData());
  const [currentRoute, setCurrentRoute] = useState<string>('/login');
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  // Authenticate session on mount
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      api.getMe()
        .then((userData) => {
          setUser(userData);
          // Set initial route based on role
          const role = userData.role.toUpperCase() as UserRole;
          if (role === 'ADMIN') setCurrentRoute('/admin/users');
          else if (role === 'RESPONDENT') setCurrentRoute('/respondent/surveys');
          else if (role === 'MANAGER') setCurrentRoute('/manager/dashboard');
          else setCurrentRoute('/researcher/surveys');
        })
        .catch(() => {
          clearAuthSession();
          setUser(null);
          setCurrentRoute('/login');
        });
    } else {
      setCurrentRoute('/login');
    }
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    const role = (loggedInUser.role || 'RESEARCHER').toUpperCase() as UserRole;
    if (role === 'ADMIN') setCurrentRoute('/admin/users');
    else if (role === 'RESPONDENT') setCurrentRoute('/respondent/surveys');
    else if (role === 'MANAGER') setCurrentRoute('/manager/dashboard');
    else setCurrentRoute('/researcher/surveys');
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    setSelectedSurvey(null);
    setCurrentRoute('/login');
  };

  // If not logged in, render SCR-001 Login
  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const role = (user.role || 'RESEARCHER').toUpperCase() as UserRole;

  // Determine page title and eyebrow for AppLayout
  const getHeaderInfo = () => {
    if (currentRoute === '/admin/users') {
      return { title: 'User Management', eyebrow: 'SYSTEM ADMINISTRATION' };
    }
    if (currentRoute === '/researcher/surveys') {
      return { title: 'Surveys', eyebrow: 'RESEARCH WORKSPACE' };
    }
    if (currentRoute === '/researcher/surveys/new') {
      return { title: 'Create Survey', eyebrow: 'RESEARCH WORKSPACE' };
    }
    if (currentRoute.includes('/edit')) {
      return { title: selectedSurvey ? `Edit: ${selectedSurvey.title}` : 'Edit Survey', eyebrow: 'RESEARCH WORKSPACE' };
    }
    if (currentRoute.includes('/questions')) {
      return { title: selectedSurvey ? selectedSurvey.title : 'Question Management', eyebrow: 'RESEARCH WORKSPACE' };
    }
    if (currentRoute.includes('/preview')) {
      return { title: 'Survey Preview', eyebrow: 'RESEARCH WORKSPACE' };
    }
    if (currentRoute === '/respondent/surveys') {
      return { title: 'Available Surveys', eyebrow: 'CUSTOMER FEEDBACK' };
    }
    if (currentRoute.startsWith('/respondent/surveys/')) {
      return { title: selectedSurvey ? selectedSurvey.title : 'Take Survey', eyebrow: 'CUSTOMER FEEDBACK' };
    }
    if (currentRoute === '/manager/dashboard') {
      return { title: 'Analytics Dashboard', eyebrow: 'ANALYTICS WORKSPACE' };
    }
    if (currentRoute.includes('/results')) {
      return { title: 'Survey Results', eyebrow: 'ANALYTICS WORKSPACE' };
    }
    if (currentRoute.includes('/feedback')) {
      return { title: 'Customer Feedback', eyebrow: 'ANALYTICS WORKSPACE' };
    }
    if (currentRoute.includes('/ai-analysis')) {
      return { title: 'AI Feedback Analysis', eyebrow: 'AI-POWERED INSIGHTS' };
    }
    return { title: 'InsightFlow', eyebrow: 'PLATFORM' };
  };

  const headerInfo = getHeaderInfo();

  return (
    <AppLayout
      user={user}
      currentRoute={currentRoute}
      onNavigate={(to) => setCurrentRoute(to)}
      onLogout={handleLogout}
      pageTitle={headerInfo.title}
      eyebrow={headerInfo.eyebrow}
    >
      {/* ================= ADMIN SCREENS ================= */}
      {role === 'ADMIN' && currentRoute === '/admin/users' && (
        <AdminUserManagementScreen />
      )}

      {/* ================= RESEARCHER SCREENS ================= */}
      {(role === 'RESEARCHER' || role === 'ADMIN') && (
        <>
          {/* SCR-002: Survey List */}
          {currentRoute === '/researcher/surveys' && (
            <ResearcherSurveyList
              onCreateSurvey={() => setCurrentRoute('/researcher/surveys/new')}
              onEditSurvey={(survey) => {
                setSelectedSurvey(survey);
                setCurrentRoute(`/researcher/surveys/${survey.id}/edit`);
              }}
              onManageSurvey={(survey) => {
                setSelectedSurvey(survey);
                setCurrentRoute(`/researcher/surveys/${survey.id}/questions`);
              }}
            />
          )}

          {/* SCR-003: Create Survey */}
          {currentRoute === '/researcher/surveys/new' && (
            <CreateSurveyScreen
              onSuccess={(created) => {
                setSelectedSurvey(created);
                setCurrentRoute(`/researcher/surveys/${created.id}/questions`);
              }}
              onCancel={() => setCurrentRoute('/researcher/surveys')}
            />
          )}

          {/* SCR-004: Edit Survey (Drafts only) */}
          {currentRoute.includes('/edit') && selectedSurvey && (
            <EditSurveyScreen
              survey={selectedSurvey}
              onSaved={(updated) => setSelectedSurvey(updated)}
              onGoToQuestions={(s) => {
                setSelectedSurvey(s);
                setCurrentRoute(`/researcher/surveys/${s.id}/questions`);
              }}
              onBack={() => setCurrentRoute('/researcher/surveys')}
            />
          )}

          {/* SCR-005, SCR-006, SCR-007: Question Management, Publish & Close */}
          {currentRoute.includes('/questions') && selectedSurvey && (
            <QuestionManagementScreen
              survey={selectedSurvey}
              onUpdateSurvey={(updated) => setSelectedSurvey(updated)}
              onBack={() => setCurrentRoute('/researcher/surveys')}
              onPreview={(s) => {
                setSelectedSurvey(s);
                setCurrentRoute(`/researcher/surveys/${s.id}/preview`);
              }}
            />
          )}

          {/* Preview Survey */}
          {currentRoute.includes('/preview') && selectedSurvey && (
            <PreviewSurveyScreen
              survey={selectedSurvey}
              onBack={() => setCurrentRoute(`/researcher/surveys/${selectedSurvey.id}/questions`)}
              onPublish={() => setCurrentRoute(`/researcher/surveys/${selectedSurvey.id}/questions`)}
            />
          )}
        </>
      )}

      {/* ================= RESPONDENT SCREENS ================= */}
      {(role === 'RESPONDENT' || role === 'ADMIN') && (
        <>
          {/* SCR-008: Published Survey List */}
          {currentRoute === '/respondent/surveys' && (
            <PublishedSurveyList
              onSelectSurvey={(survey) => {
                setSelectedSurvey(survey);
                setCurrentRoute(`/respondent/surveys/${survey.id}`);
              }}
            />
          )}

          {/* SCR-009 & SCR-010: Answer Questions and Submit Confirmation */}
          {currentRoute.startsWith('/respondent/surveys/') && currentRoute !== '/respondent/surveys' && !currentRoute.endsWith('/success') && selectedSurvey && (
            <SurveyAnswerScreen
              survey={selectedSurvey}
              onSubmitSuccess={() => setCurrentRoute(`/respondent/surveys/${selectedSurvey.id}/success`)}
              onBack={() => setCurrentRoute('/respondent/surveys')}
            />
          )}

          {/* SCR-011: Submit Success */}
          {currentRoute.endsWith('/success') && (
            <SubmitSuccessScreen
              onBackToSurveys={() => setCurrentRoute('/respondent/surveys')}
            />
          )}
        </>
      )}

      {/* ================= MANAGER SCREENS ================= */}
      {(role === 'MANAGER' || role === 'ADMIN') && (
        <>
          {/* SCR-015: Manager Dashboard */}
          {currentRoute === '/manager/dashboard' && (
            <SurveyDashboardScreen
              onSelectSurveyResults={(surveyId) => {
                setCurrentRoute(`/manager/surveys/${surveyId}/results`);
              }}
              onViewGlobalAI={() => {
                setCurrentRoute('/manager/surveys/1/ai-analysis');
              }}
            />
          )}

          {/* SCR-012: Survey Results */}
          {currentRoute.includes('/results') && (
            <SurveyResultsScreen
              surveyId={currentRoute.split('/')[3] || '1'}
              onBack={() => setCurrentRoute('/manager/dashboard')}
              onViewFeedback={(surveyId) => setCurrentRoute(`/manager/surveys/${surveyId}/feedback`)}
              onViewAIAnalysis={(surveyId) => setCurrentRoute(`/manager/surveys/${surveyId}/ai-analysis`)}
            />
          )}

          {/* SCR-013: Customer Feedback */}
          {currentRoute.includes('/feedback') && (
            <FeedbackScreen
              surveyId={currentRoute.split('/')[3] || '1'}
              onBack={() => setCurrentRoute(`/manager/surveys/${currentRoute.split('/')[3] || '1'}/results`)}
              onViewAIAnalysis={(surveyId) => setCurrentRoute(`/manager/surveys/${surveyId}/ai-analysis`)}
            />
          )}

          {/* SCR-014: AI Analysis */}
          {currentRoute.includes('/ai-analysis') && (
            <AIAnalysisScreen
              surveyId={currentRoute.split('/')[3] || '1'}
              onBack={() => setCurrentRoute(`/manager/surveys/${currentRoute.split('/')[3] || '1'}/results`)}
            />
          )}
        </>
      )}
    </AppLayout>
  );
}
