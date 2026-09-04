import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Check,
  ChevronLeft,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  Trash2,
  X,
  RefreshCw,
  Eye,
  AlertCircle
} from 'lucide-react';
import { api, getUserData, getAccessToken, clearAuthSession } from './api';
import './styles.css';

export default function App() {
  const [user, setUser] = useState(getUserData());
  const [page, setPage] = useState('dashboard');
  const [notice, setNotice] = useState({ text: '', type: 'error' });
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  // Active survey context
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [draftSurvey, setDraftSurvey] = useState({ title: '', description: '' });

  // Respondent answers: { [questionId]: value }
  const [answers, setAnswers] = useState({});
  const [feedbackText, setFeedbackText] = useState('');

  // Analytics data
  const [dashboardData, setDashboardData] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const [aiData, setAiData] = useState(null);

  const showNotice = (text, type = 'error') => {
    setNotice({ text, type });
    setTimeout(() => setNotice({ text: '', type: 'error' }), 5000);
  };

  // Check auth session on startup
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      api.getMe()
        .then(u => {
          setUser(u);
          setPage(u.role === 'RESPONDENT' ? 'available' : 'dashboard');
        })
        .catch(() => {
          clearAuthSession();
          setUser(null);
        });
    }
  }, []);

  // Fetch initial data based on role and page
  useEffect(() => {
    if (!user) return;
    if (page === 'dashboard' && user.role === 'MANAGER') {
      loadManagerDashboard();
    } else if (page === 'dashboard' && (user.role === 'RESEARCHER' || user.role === 'ADMIN')) {
      loadResearcherSurveys();
    } else if (page === 'available' || user.role === 'RESPONDENT') {
      loadAvailableSurveys();
    }
  }, [user, page]);

  const loadManagerDashboard = async () => {
    try {
      setLoading(true);
      const data = await api.getDashboard();
      setDashboardData(data);
      const surveyList = await api.getSurveys();
      setSurveys(surveyList);
      if (surveyList.length > 0 && !selectedSurvey) {
        setSelectedSurvey(surveyList[0]);
      }
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadResearcherSurveys = async () => {
    try {
      setLoading(true);
      const list = await api.getSurveys();
      setSurveys(list);
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSurveys = async () => {
    try {
      setLoading(true);
      const list = await api.getAvailableSurveys();
      setSurveys(list);
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    setSelectedSurvey(null);
    setSurveys([]);
    setPage('dashboard');
  };

  const handleCreateSurvey = async () => {
    if (!draftSurvey.title.trim()) {
      showNotice('Survey title is required.');
      return;
    }
    try {
      setLoading(true);
      const created = await api.createSurvey(draftSurvey);
      const detailed = await api.getSurvey(created.id);
      setSelectedSurvey(detailed);
      showNotice('Survey draft created successfully!', 'success');
      setPage('editor');
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSurveyInfo = async () => {
    if (!selectedSurvey || !selectedSurvey.title.trim()) {
      showNotice('Survey title is required.');
      return;
    }
    try {
      setLoading(true);
      await api.updateSurvey(selectedSurvey.id, {
        title: selectedSurvey.title,
        description: selectedSurvey.description
      });
      showNotice('Survey updated.', 'success');
      loadResearcherSurveys();
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishSurvey = async (surveyId) => {
    try {
      setLoading(true);
      await api.publishSurvey(surveyId);
      showNotice('Survey published successfully!', 'success');
      setModal(null);
      await loadResearcherSurveys();
      setPage('published');
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSurvey = async (surveyId) => {
    try {
      setLoading(true);
      await api.closeSurvey(surveyId);
      showNotice('Survey has been closed.', 'success');
      setModal(null);
      await loadResearcherSurveys();
      setPage('dashboard');
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSurvey = async (surveyId) => {
    try {
      setLoading(true);
      await api.deleteSurvey(surveyId);
      showNotice('Survey deleted.', 'success');
      setModal(null);
      await loadResearcherSurveys();
      setPage('dashboard');
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (qData) => {
    try {
      setLoading(true);
      await api.addQuestion(selectedSurvey.id, qData);
      const updated = await api.getSurvey(selectedSurvey.id);
      setSelectedSurvey(updated);
      showNotice('Question added.', 'success');
      setPage('editor');
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (qId) => {
    try {
      setLoading(true);
      await api.deleteQuestion(selectedSurvey.id, qId);
      const updated = await api.getSurvey(selectedSurvey.id);
      setSelectedSurvey(updated);
      showNotice('Question deleted.', 'success');
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSurveyForTaking = async (s) => {
    try {
      setLoading(true);
      const detailed = await api.getSurvey(s.id);
      setSelectedSurvey(detailed);
      setAnswers({});
      setFeedbackText('');
      setPage('form');
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitResponse = async () => {
    // Validate required questions
    const missing = selectedSurvey.questions.filter(q => q.required && !answers[q.id]);
    if (missing.length > 0) {
      showNotice('Please answer all required questions.');
      return;
    }

    const payloadAnswers = selectedSurvey.questions.map(q => {
      const val = answers[q.id];
      const item = { question_id: q.id };
      if (q.question_type === 'Rating') {
        item.rating_value = val ? parseInt(val, 10) : null;
      } else if (q.question_type === 'Multiple choice') {
        item.selected_option = val || null;
      } else {
        item.text_value = val || null;
      }
      return item;
    });

    try {
      setLoading(true);
      await api.submitSurvey(selectedSurvey.id, payloadAnswers, feedbackText);
      setModal(null);
      setPage('submitted');
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSurveyResults = async (surveyId) => {
    try {
      setLoading(true);
      const [res, fb, ai] = await Promise.all([
        api.getSurveyResults(surveyId),
        api.getSurveyFeedback(surveyId),
        api.getSurveyAIAnalysis(surveyId)
      ]);
      setResultsData(res);
      setFeedbackData(fb);
      setAiData(ai);
      setPage('results');
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerAI = async (surveyId) => {
    try {
      setLoading(true);
      const ai = await api.triggerAIAnalysis(surveyId);
      setAiData(ai);
      showNotice('AI Analysis updated with latest customer feedback!', 'success');
      setPage('analysis');
    } catch (err) {
      showNotice(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <AuthScreen
        onSuccess={(userData) => {
          setUser(userData);
          setPage(userData.role === 'RESPONDENT' ? 'available' : 'dashboard');
        }}
      />
    );
  }

  const role = user.role ? user.role.toLowerCase() : 'researcher';

  return (
    <div className="app">
      <aside>
        <div className="brand">
          <span className="brand-icon">
            <MessageSquare size={19} />
          </span>
          InsightFlow
        </div>
        <div className="role-badge">{role}</div>

        <nav>
          {role !== 'respondent' && (
            <Nav
              icon={<LayoutDashboard />}
              label="Dashboard"
              active={page === 'dashboard'}
              onClick={() => {
                setPage('dashboard');
                if (role === 'manager') loadManagerDashboard();
                else loadResearcherSurveys();
              }}
            />
          )}

          {(role === 'researcher' || role === 'admin') && (
            <Nav
              icon={<ClipboardList />}
              label="My Surveys"
              active={['dashboard', 'create', 'editor', 'preview', 'published'].includes(page)}
              onClick={() => {
                setPage('dashboard');
                loadResearcherSurveys();
              }}
            />
          )}

          {role === 'respondent' && (
            <Nav
              icon={<ClipboardList />}
              label="Available Surveys"
              active={['available', 'form', 'submitted'].includes(page)}
              onClick={() => {
                setPage('available');
                loadAvailableSurveys();
              }}
            />
          )}

          {(role === 'manager' || role === 'admin') && (
            <>
              <Nav
                icon={<BarChart3 />}
                label="Survey Results"
                active={['results', 'feedback'].includes(page)}
                onClick={() => {
                  if (surveys.length > 0) {
                    handleLoadSurveyResults(selectedSurvey ? selectedSurvey.id : surveys[0].id);
                  } else {
                    showNotice('No surveys available to analyze.');
                  }
                }}
              />
              <Nav
                icon={<Sparkles />}
                label="AI Analysis"
                active={page === 'analysis'}
                onClick={() => {
                  if (surveys.length > 0) {
                    const sid = selectedSurvey ? selectedSurvey.id : surveys[0].id;
                    api.getSurveyAIAnalysis(sid).then(ai => {
                      setAiData(ai);
                      setPage('analysis');
                    }).catch(e => showNotice(e.message));
                  } else {
                    showNotice('No surveys available for AI analysis.');
                  }
                }}
              />
            </>
          )}
        </nav>

        <div className="user-info">
          <div className="user-avatar-sm">{user.full_name ? user.full_name[0].toUpperCase() : 'U'}</div>
          <div className="user-details">
            <b>{user.full_name || user.email}</b>
            <span>{user.email}</span>
          </div>
        </div>

        <button className="logout" onClick={handleLogout}>
          <LogOut /> <span>Log out</span>
        </button>
      </aside>

      <main>
        <header>
          <div>
            <p className="eyebrow">
              {role === 'researcher'
                ? 'RESEARCH WORKSPACE'
                : role === 'manager'
                ? 'ANALYTICS WORKSPACE'
                : 'FEEDBACK WORKSPACE'}
            </p>
            <h1>
              {page === 'dashboard' && (role === 'manager' ? 'Analytics Overview' : 'Surveys')}
              {page === 'create' && 'Create Survey'}
              {page === 'editor' && (selectedSurvey ? selectedSurvey.title : 'Survey Editor')}
              {page === 'addQuestion' && 'Add Question'}
              {page === 'preview' && 'Survey Preview'}
              {page === 'available' && 'Available Surveys'}
              {page === 'form' && (selectedSurvey ? selectedSurvey.title : 'Survey Form')}
              {page === 'results' && 'Survey Results'}
              {page === 'feedback' && 'Customer Feedback'}
              {page === 'analysis' && 'AI Feedback Analysis'}
              {page === 'published' && 'Survey Published'}
              {page === 'submitted' && 'Response Submitted'}
            </h1>
          </div>
          <div className="avatar">
            {user.full_name ? user.full_name[0].toUpperCase() : user.email[0].toUpperCase()}
          </div>
        </header>

        {notice.text && (
          <div className={`alert ${notice.type === 'success' ? 'success' : ''}`}>
            <span>{notice.text}</span>
            <button onClick={() => setNotice({ text: '', type: 'error' })}>
              <X size={16} />
            </button>
          </div>
        )}

        {/* RESEARCHER VIEWS */}
        {page === 'dashboard' && role !== 'manager' && (
          <ResearcherSurveysView
            surveys={surveys}
            loading={loading}
            onCreate={() => {
              setDraftSurvey({ title: '', description: '' });
              setPage('create');
            }}
            onEdit={async (s) => {
              const full = await api.getSurvey(s.id);
              setSelectedSurvey(full);
              setPage('editor');
            }}
            onPreview={async (s) => {
              const full = await api.getSurvey(s.id);
              setSelectedSurvey(full);
              setPage('preview');
            }}
            onPublish={(s) => setModal({ type: 'publish', survey: s })}
            onClose={(s) => setModal({ type: 'close', survey: s })}
            onDelete={(s) => setModal({ type: 'delete', survey: s })}
          />
        )}

        {page === 'create' && (
          <CreateSurveyView
            draft={draftSurvey}
            setDraft={setDraftSurvey}
            loading={loading}
            onCancel={() => setPage('dashboard')}
            onSave={handleCreateSurvey}
          />
        )}

        {page === 'editor' && selectedSurvey && (
          <SurveyEditorView
            survey={selectedSurvey}
            setSurvey={setSelectedSurvey}
            onSaveInfo={handleUpdateSurveyInfo}
            onAddQuestion={() => setPage('addQuestion')}
            onDeleteQuestion={handleDeleteQuestion}
            onPreview={() => setPage('preview')}
            onPublish={() => setModal({ type: 'publish', survey: selectedSurvey })}
            onClose={() => setModal({ type: 'close', survey: selectedSurvey })}
          />
        )}

        {page === 'addQuestion' && (
          <AddQuestionView
            onCancel={() => setPage('editor')}
            onSave={handleAddQuestion}
            loading={loading}
          />
        )}

        {page === 'preview' && selectedSurvey && (
          <PreviewView
            survey={selectedSurvey}
            onBack={() => setPage(role === 'researcher' ? 'editor' : 'dashboard')}
            onPublish={() => setModal({ type: 'publish', survey: selectedSurvey })}
          />
        )}

        {/* RESPONDENT VIEWS */}
        {page === 'available' && (
          <AvailableSurveysView
            surveys={surveys}
            loading={loading}
            onTakeSurvey={handleOpenSurveyForTaking}
          />
        )}

        {page === 'form' && selectedSurvey && (
          <TakeSurveyView
            survey={selectedSurvey}
            answers={answers}
            setAnswers={setAnswers}
            feedbackText={feedbackText}
            setFeedbackText={setFeedbackText}
            loading={loading}
            onBack={() => setPage('available')}
            onSubmit={() => setModal({ type: 'submit_response' })}
          />
        )}

        {/* MANAGER VIEWS */}
        {page === 'dashboard' && role === 'manager' && (
          <ManagerDashboardView
            dashboard={dashboardData}
            surveys={surveys}
            selectedSurvey={selectedSurvey}
            setSelectedSurvey={setSelectedSurvey}
            onViewResults={(sId) => handleLoadSurveyResults(sId)}
          />
        )}

        {page === 'results' && resultsData && (
          <SurveyResultsView
            results={resultsData}
            surveys={surveys}
            onSelectSurvey={handleLoadSurveyResults}
            onViewFeedback={() => setPage('feedback')}
            onViewAnalysis={() => {
              if (aiData) setPage('analysis');
              else handleTriggerAI(resultsData.survey_id);
            }}
          />
        )}

        {page === 'feedback' && feedbackData && (
          <SurveyFeedbackView
            feedbackData={feedbackData}
            onBack={() => setPage('results')}
            onTriggerAI={() => handleTriggerAI(feedbackData.survey_id)}
          />
        )}

        {page === 'analysis' && aiData && (
          <SurveyAIAnalysisView
            aiData={aiData}
            surveyId={selectedSurvey?.id || resultsData?.survey_id}
            onBack={() => setPage('results')}
            onRefreshAI={() => handleTriggerAI(selectedSurvey?.id || resultsData?.survey_id)}
            loading={loading}
          />
        )}

        {/* SUCCESS SCREENS */}
        {page === 'published' && (
          <SuccessCard
            title="Survey published successfully!"
            text="Your survey is now live and accepting responses from respondents."
            buttonText="Back to surveys"
            onClick={() => {
              loadResearcherSurveys();
              setPage('dashboard');
            }}
          />
        )}

        {page === 'submitted' && (
          <SuccessCard
            title="Response submitted successfully!"
            text="Thank you for taking the time to provide your valuable feedback."
            buttonText="View other surveys"
            onClick={() => {
              loadAvailableSurveys();
              setPage('available');
            }}
          />
        )}
      </main>

      {/* Confirmation Modals */}
      {modal && (
        <Modal
          title={
            modal.type === 'publish'
              ? 'Publish this survey?'
              : modal.type === 'close'
              ? 'Close this survey?'
              : modal.type === 'delete'
              ? 'Delete this survey?'
              : 'Submit your response?'
          }
          text={
            modal.type === 'publish'
              ? 'Are you sure you want to publish? Once published, respondents can view and submit responses.'
              : modal.type === 'close'
              ? 'Are you sure you want to close this survey? No further responses will be accepted.'
              : modal.type === 'delete'
              ? 'Are you sure you want to delete this draft? This action cannot be undone.'
              : 'Are you sure you want to submit? You will not be able to edit your answers afterwards.'
          }
          confirmText={
            modal.type === 'publish'
              ? 'Publish Survey'
              : modal.type === 'close'
              ? 'Close Survey'
              : modal.type === 'delete'
              ? 'Delete Survey'
              : 'Submit Response'
          }
          confirmStyle={modal.type === 'delete' ? 'danger-btn' : 'primary'}
          onCancel={() => setModal(null)}
          onConfirm={() => {
            if (modal.type === 'publish') handlePublishSurvey(modal.survey.id);
            else if (modal.type === 'close') handleCloseSurvey(modal.survey.id);
            else if (modal.type === 'delete') handleDeleteSurvey(modal.survey.id);
            else if (modal.type === 'submit_response') handleSubmitResponse();
          }}
        />
      )}
    </div>
  );
}

// ---------------- SUB-COMPONENTS ---------------- //

function Nav({ icon, label, active, onClick }) {
  return (
    <button className={`nav ${active ? 'active' : ''}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Modal({ title, text, confirmText, confirmStyle = 'primary', onCancel, onConfirm }) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="actions">
          <button className="secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className={confirmStyle} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessCard({ title, text, buttonText, onClick }) {
  return (
    <div className="success card">
      <span>
        <Check size={32} />
      </span>
      <h2>{title}</h2>
      <p>{text}</p>
      <button className="primary" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}

// ---------------- AUTH SCREEN ---------------- //

function AuthScreen({ onSuccess }) {
  const [tab, setTab] = useState('login'); // login or register
  const [email, setEmail] = useState('researcher@insightflow.com');
  const [password, setPassword] = useState('password');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('RESEARCHER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (loginEmail = email, loginPass = password) => {
    setError('');
    setLoading(true);
    try {
      const res = await api.login(loginEmail, loginPass);
      onSuccess(res.user);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !fullName) {
      setError('Please fill out all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.register(email, password, fullName, role);
      onSuccess(res.user);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoRole) => {
    const demoAccounts = {
      researcher: { email: 'researcher@insightflow.com', pass: 'password' },
      respondent: { email: 'respondent@insightflow.com', pass: 'password' },
      manager: { email: 'manager@insightflow.com', pass: 'password' },
      admin: { email: 'admin@insightflow.com', pass: 'password' }
    };
    const creds = demoAccounts[demoRole];
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.pass);
      handleLogin(creds.email, creds.pass);
    }
  };

  return (
    <div className="login-page">
      <section className="login-card">
        <div className="login-logo">
          <span className="brand-icon">
            <MessageSquare size={19} />
          </span>
          InsightFlow
        </div>

        <p className="eyebrow">AI CUSTOMER FEEDBACK & SURVEY PLATFORM</p>
        <h1>{tab === 'login' ? 'Welcome back' : 'Create an account'}</h1>
        <p className="muted">
          {tab === 'login'
            ? 'Sign in to access your surveys, feedback and AI insights.'
            : 'Register to start creating surveys or sharing your valuable feedback.'}
        </p>

        <div className="tab-toggle">
          <button
            type="button"
            className={tab === 'login' ? 'active' : ''}
            onClick={() => {
              setTab('login');
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={tab === 'register' ? 'active' : ''}
            onClick={() => {
              setTab('register');
              setError('');
            }}
          >
            Register
          </button>
        </div>

        {tab === 'login' ? (
          <div>
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error && <p className="field-error">{error}</p>}
            <button
              className="primary wide"
              disabled={loading}
              onClick={() => handleLogin()}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegister}>
            <label>
              Full Name <em>*</em>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyen Van A"
                required
              />
            </label>
            <label>
              Email address <em>*</em>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </label>
            <label>
              Password <em>*</em>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
              />
            </label>
            <label>
              Account Role
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="RESEARCHER">Researcher (Create & Manage Surveys)</option>
                <option value="RESPONDENT">Respondent (Take Surveys & Give Feedback)</option>
                <option value="MANAGER">Manager (Analytics & AI Insights)</option>
              </select>
            </label>
            {error && <p className="field-error">{error}</p>}
            <button type="submit" className="primary wide" disabled={loading}>
              {loading ? 'Registering…' : 'Register Account'}
            </button>
          </form>
        )}

        <div className="demo">
          <span>Quick Demo Access (Seeded in Database)</span>
          <button type="button" onClick={() => handleDemoLogin('researcher')}>
            Researcher
          </button>
          <button type="button" onClick={() => handleDemoLogin('respondent')}>
            Respondent
          </button>
          <button type="button" onClick={() => handleDemoLogin('manager')}>
            Manager
          </button>
          <button type="button" onClick={() => handleDemoLogin('admin')}>
            Admin
          </button>
        </div>
      </section>

      <section className="login-aside">
        <div>
          <span className="spark">
            <Sparkles />
          </span>
          <h2>Turn customer feedback into intelligent decisions.</h2>
          <p>
            Create surveys effortlessly, gather real-time customer sentiments, and unlock instant AI-driven summaries and recommendations.
          </p>
        </div>
      </section>
    </div>
  );
}

// ---------------- RESEARCHER SCREENS ---------------- //

function ResearcherSurveysView({ surveys, loading, onCreate, onEdit, onPreview, onPublish, onClose, onDelete }) {
  return (
    <>
      <div className="toolbar">
        <p className="muted">Manage your customer feedback questionnaires, review statuses, and publish surveys.</p>
        <button className="primary" onClick={onCreate}>
          <Plus size={18} /> Create Survey
        </button>
      </div>

      {loading && surveys.length === 0 ? (
        <div className="state-card">
          <p>Loading surveys from backend...</p>
        </div>
      ) : surveys.length === 0 ? (
        <div className="state-card">
          <ClipboardList size={38} />
          <h3>No surveys created yet</h3>
          <p>Create your first survey to start collecting structured feedback from respondents.</p>
          <button className="primary" onClick={onCreate}>
            <Plus size={16} /> Create Survey
          </button>
        </div>
      ) : (
        <div className="card table-card">
          <table>
            <thead>
              <tr>
                <th>Survey</th>
                <th>Status</th>
                <th>Questions</th>
                <th>Responses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((s) => (
                <tr key={s.id}>
                  <td>
                    <b>{s.title}</b>
                    <small>{s.description || 'No description provided.'}</small>
                  </td>
                  <td>
                    <span className={`badge ${s.status.toLowerCase()}`}>{s.status}</span>
                  </td>
                  <td>{s.questions_count ?? (s.questions ? s.questions.length : 0)}</td>
                  <td>{s.responses_count ?? 0}</td>
                  <td>
                    <div className="btn-group">
                      {s.status === 'DRAFT' && (
                        <>
                          <button className="link" onClick={() => onEdit(s)}>
                            Edit
                          </button>
                          <button className="link" onClick={() => onPublish(s)}>
                            Publish
                          </button>
                          <button className="link danger" onClick={() => onDelete(s)}>
                            Delete
                          </button>
                        </>
                      )}
                      {s.status === 'PUBLISHED' && (
                        <>
                          <button className="link" onClick={() => onPreview(s)}>
                            Preview
                          </button>
                          <button className="link danger" onClick={() => onClose(s)}>
                            Close
                          </button>
                        </>
                      )}
                      {s.status === 'CLOSED' && (
                        <button className="link" onClick={() => onPreview(s)}>
                          View
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function CreateSurveyView({ draft, setDraft, loading, onCancel, onSave }) {
  return (
    <div className="card form-card">
      <h2>Survey Details</h2>
      <p className="muted">Define the basic information for your survey. You can add questions next.</p>

      <label>
        Survey Title <em>*</em>
        <input
          type="text"
          placeholder="e.g. Customer Satisfaction Survey Q3"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
      </label>

      <label>
        Description
        <textarea
          placeholder="Tell respondents the purpose of this survey..."
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        />
      </label>

      <div className="actions">
        <button className="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button className="primary" onClick={onSave} disabled={loading}>
          {loading ? 'Saving…' : 'Save and Add Questions'}
        </button>
      </div>
    </div>
  );
}

function SurveyEditorView({ survey, setSurvey, onSaveInfo, onAddQuestion, onDeleteQuestion, onPreview, onPublish, onClose }) {
  const isDraft = survey.status === 'DRAFT';

  return (
    <>
      <div className="toolbar">
        <div>
          <h2>{survey.title}</h2>
          <p className="muted">
            Status: <span className={`badge ${survey.status.toLowerCase()}`}>{survey.status}</span> ·{' '}
            {survey.questions ? survey.questions.length : 0} questions
          </p>
        </div>
        <div className="btn-group">
          <button className="secondary" onClick={onPreview}>
            <Eye size={16} /> Preview
          </button>
          {isDraft && (
            <button className="primary" onClick={onPublish}>
              Publish Survey
            </button>
          )}
          {survey.status === 'PUBLISHED' && (
            <button className="danger-btn" onClick={onClose}>
              Close Survey
            </button>
          )}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3>Survey Information</h3>
        <label>
          Title <em>*</em>
          <input
            disabled={!isDraft}
            value={survey.title}
            onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
          />
        </label>
        <label>
          Description
          <textarea
            disabled={!isDraft}
            value={survey.description || ''}
            onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
          />
        </label>
        {isDraft && (
          <div className="actions" style={{ marginTop: '16px' }}>
            <button className="secondary btn-sm" onClick={onSaveInfo}>
              Update Info
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="editor-header">
          <div>
            <h2>Questions</h2>
            <p className="muted">
              {survey.questions ? survey.questions.length : 0} question(s) in this survey.
            </p>
          </div>
          {isDraft && (
            <button className="primary" onClick={onAddQuestion}>
              <Plus size={16} /> Add Question
            </button>
          )}
        </div>

        {!survey.questions || survey.questions.length === 0 ? (
          <div className="empty-inline">
            <p>No questions added yet. Click &quot;Add Question&quot; to build your survey questionnaire.</p>
          </div>
        ) : (
          survey.questions.map((q, idx) => (
            <div className="question-row" key={q.id}>
              <span className="number">{idx + 1}</span>
              <div className="question-info">
                <b>{q.text}</b>
                <small>
                  Type: <b>{q.question_type}</b> {q.required ? '· Required' : '· Optional'}
                  {q.question_type === 'Multiple choice' && q.options && (
                    <span> · Options: {Array.isArray(q.options) ? q.options.join(', ') : q.options}</span>
                  )}
                </small>
              </div>
              {isDraft && (
                <button
                  className="link danger"
                  title="Delete question"
                  onClick={() => onDeleteQuestion(q.id)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

function AddQuestionView({ onCancel, onSave, loading }) {
  const [text, setText] = useState('');
  const [questionType, setQuestionType] = useState('Rating');
  const [required, setRequired] = useState(true);
  const [optionsStr, setOptionsStr] = useState('Excellent, Good, Fair, Poor');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    let options = [];
    if (questionType === 'Multiple choice') {
      options = optionsStr
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean);
      if (options.length === 0) {
        alert('Please enter at least one option for multiple choice question.');
        return;
      }
    }

    onSave({
      text: text.trim(),
      question_type: questionType,
      required,
      options
    });
  };

  return (
    <div className="card form-card">
      <h2>Add New Question</h2>
      <p className="muted">Specify the question text, type, and options.</p>

      <form onSubmit={handleSubmit}>
        <label>
          Question Text <em>*</em>
          <input
            type="text"
            placeholder="e.g. How satisfied are you with our overall customer service?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </label>

        <label>
          Question Type
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            <option value="Rating">Rating (1 - 5 Stars)</option>
            <option value="Multiple choice">Multiple Choice</option>
            <option value="Text">Open Text / Feedback</option>
          </select>
        </label>

        {questionType === 'Multiple choice' && (
          <label>
            Options (separated by commas) <em>*</em>
            <input
              type="text"
              value={optionsStr}
              onChange={(e) => setOptionsStr(e.target.value)}
              placeholder="Option 1, Option 2, Option 3"
            />
            <small>Enter choices separated by commas (e.g. Excellent, Good, Fair, Poor).</small>
          </label>
        )}

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          <span>Mark as required question</span>
        </label>

        <div className="actions">
          <button type="button" className="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="primary" disabled={loading}>
            {loading ? 'Adding…' : 'Add Question'}
          </button>
        </div>
      </form>
    </div>
  );
}

function PreviewView({ survey, onBack, onPublish }) {
  return (
    <div className="preview">
      <button className="back page-back" onClick={onBack}>
        <ChevronLeft size={16} /> Back to Editor
      </button>

      <div className="toolbar">
        <div>
          <h2>{survey.title}</h2>
          <p className="muted">{survey.description || 'No description provided.'}</p>
        </div>
        {survey.status === 'DRAFT' && (
          <button className="primary" onClick={onPublish}>
            Publish Now
          </button>
        )}
      </div>

      <div className="respond-form card">
        <p className="muted" style={{ marginBottom: '20px' }}>
          This is an interactive preview of how respondents will experience your survey.
        </p>

        {survey.questions && survey.questions.length > 0 ? (
          survey.questions.map((q, idx) => (
            <div className="field-question" key={q.id}>
              <label>
                {idx + 1}. {q.text} {q.required && <em>*</em>}
              </label>

              {q.question_type === 'Rating' ? (
                <div className="ratings">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button type="button" key={num} disabled>
                      {num}
                    </button>
                  ))}
                </div>
              ) : q.question_type === 'Multiple choice' ? (
                <div className="options">
                  {(Array.isArray(q.options) ? q.options : []).map((opt) => (
                    <label key={opt}>
                      <input type="radio" disabled name={`preview_${q.id}`} />
                      {opt}
                    </label>
                  ))}
                </div>
              ) : (
                <textarea disabled placeholder="Respondents can type answers here..." />
              )}
            </div>
          ))
        ) : (
          <div className="empty-inline">No questions have been added yet.</div>
        )}
      </div>
    </div>
  );
}

// ---------------- RESPONDENT SCREENS ---------------- //

function AvailableSurveysView({ surveys, loading, onTakeSurvey }) {
  return (
    <>
      <div className="toolbar">
        <p className="muted">Explore published questionnaires and share your thoughts to help us improve.</p>
      </div>

      {loading && surveys.length === 0 ? (
        <div className="state-card">
          <p>Loading available surveys...</p>
        </div>
      ) : surveys.length === 0 ? (
        <div className="state-card">
          <ClipboardList size={38} />
          <h3>No surveys available at this time</h3>
          <p>Please check back later when researchers publish new surveys.</p>
        </div>
      ) : (
        surveys.map((s) => (
          <div className="survey-tile card" key={s.id}>
            <div className="survey-icon">
              <ClipboardList />
            </div>
            <div>
              <span className="badge published">Published</span>
              <h2>{s.title}</h2>
              <p>{s.description || 'Help us improve by providing your feedback.'}</p>
              <small>
                {s.questions_count ?? (s.questions ? s.questions.length : 0)} questions · Takes about 2 minutes
              </small>
            </div>
            <button className="primary" onClick={() => onTakeSurvey(s)}>
              Take Survey <Send size={15} />
            </button>
          </div>
        ))
      )}
    </>
  );
}

function TakeSurveyView({ survey, answers, setAnswers, feedbackText, setFeedbackText, loading, onBack, onSubmit }) {
  return (
    <div className="respond-form">
      <button className="back page-back" onClick={onBack}>
        <ChevronLeft size={16} /> Back to Available Surveys
      </button>

      <div className="card">
        <h2>{survey.title}</h2>
        <p className="muted">{survey.description || 'Please complete all required questions below.'}</p>

        {survey.questions && survey.questions.map((q, idx) => (
          <div className="field-question" key={q.id}>
            <label>
              {idx + 1}. {q.text} {q.required && <em>*</em>}
            </label>

            {q.question_type === 'Rating' ? (
              <div className="ratings">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    className={answers[q.id] === num ? 'selected' : ''}
                    onClick={() => setAnswers({ ...answers, [q.id]: num })}
                  >
                    {num} ★
                  </button>
                ))}
              </div>
            ) : q.question_type === 'Multiple choice' ? (
              <div className="options">
                {(Array.isArray(q.options) ? q.options : []).map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name={`q_${q.id}`}
                      checked={answers[q.id] === opt}
                      onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                placeholder="Share your detailed response..."
                value={answers[q.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              />
            )}
          </div>
        ))}

        <div className="feedback-section">
          <h3>Overall Feedback & Comments</h3>
          <p className="muted">
            Have any additional thoughts or suggestions? Our AI engine will analyze this to generate actionable insights.
          </p>
          <textarea
            placeholder="Tell us anything else you would like us to know..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </div>

        <div className="actions" style={{ marginTop: '24px' }}>
          <button className="secondary" onClick={onBack} disabled={loading}>
            Cancel
          </button>
          <button className="primary" onClick={onSubmit} disabled={loading}>
            {loading ? 'Submitting…' : 'Submit Responses'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------- MANAGER / ANALYTICS SCREENS ---------------- //

function ManagerDashboardView({ dashboard, surveys, selectedSurvey, setSelectedSurvey, onViewResults }) {
  if (!dashboard) {
    return (
      <div className="state-card">
        <p>Loading overview metrics...</p>
      </div>
    );
  }

  return (
    <>
      <p className="muted">
        High-level KPIs, sentiment trends, and key topics aggregated across all published surveys.
      </p>

      <div className="metrics">
        <div className="metric">
          <p>Total Surveys</p>
          <b>{dashboard.total_surveys}</b>
        </div>
        <div className="metric">
          <p>Total Responses</p>
          <b>{dashboard.total_responses}</b>
        </div>
        <div className="metric">
          <p>Average Rating</p>
          <b>{dashboard.average_rating}</b>
        </div>
        <div className="metric">
          <p>Positive Sentiment</p>
          <b>{dashboard.positive_sentiment}</b>
        </div>
      </div>

      <div className="split">
        <div className="card">
          <h2>Overall Sentiment Breakdown</h2>
          <p className="muted">Customer sentiment classified via NLP & AI engine.</p>
          <div className="bars" style={{ marginTop: '16px' }}>
            {(dashboard.sentiment_overview || []).map((s) => (
              <div className="bar-row" key={s.label}>
                <span>{s.label}</span>
                <div>
                  <i className={s.color} style={{ width: s.value }} />
                </div>
                <b>{s.value}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Trending Topics</h2>
          <p className="muted">Most common themes extracted from customer open feedback.</p>
          <div className="topics">
            {(dashboard.top_topics || []).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3>Detailed Survey Results</h3>
            <p className="muted">Select a survey to view detailed metrics and AI analysis:</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <select
                value={selectedSurvey ? selectedSurvey.id : ''}
                onChange={(e) => {
                  const found = surveys.find((s) => s.id === e.target.value);
                  if (found) setSelectedSurvey(found);
                }}
                style={{ marginTop: 0 }}
              >
                {surveys.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.status})
                  </option>
                ))}
              </select>
              <button
                className="primary"
                style={{ whiteSpace: 'nowrap' }}
                onClick={() => {
                  if (selectedSurvey) onViewResults(selectedSurvey.id);
                  else if (surveys.length > 0) onViewResults(surveys[0].id);
                }}
              >
                View Results →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SurveyResultsView({ results, surveys, onSelectSurvey, onViewFeedback, onViewAnalysis }) {
  return (
    <>
      <div className="toolbar">
        <div>
          <h2>{results.title}</h2>
          <p className="muted">
            Survey ID: {results.survey_id} · Total Responses: {results.total_responses}
          </p>
        </div>
        <div className="btn-group">
          <button className="secondary" onClick={onViewFeedback}>
            View Feedback List
          </button>
          <button className="primary" onClick={onViewAnalysis}>
            <Sparkles size={16} /> View AI Analysis
          </button>
        </div>
      </div>

      <div className="metrics">
        <div className="metric">
          <p>Total Responses</p>
          <b>{results.total_responses}</b>
        </div>
        <div className="metric">
          <p>Average Rating</p>
          <b>{results.average_rating} / 5.0</b>
        </div>
        <div className="metric">
          <p>Feedback Received</p>
          <b>{results.recent_feedbacks ? results.recent_feedbacks.length : 0}</b>
        </div>
        <div className="metric">
          <p>Survey Status</p>
          <b style={{ fontSize: '20px' }}>Active</b>
        </div>
      </div>

      <div className="split">
        <div className="card">
          <h2>Rating Distribution</h2>
          <p className="muted">Breakdown of 1 to 5 star scores submitted by respondents.</p>
          <div className="bars" style={{ marginTop: '16px' }}>
            {(results.rating_distribution || []).map((row) => (
              <div className="bar-row" key={row.stars}>
                <span>{row.label}</span>
                <div>
                  <i
                    className={
                      row.stars >= 4 ? 'green' : row.stars === 3 ? 'blue' : 'orange'
                    }
                    style={{ width: row.percentage }}
                  />
                </div>
                <b>{row.percentage}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Recent Customer Feedback</h2>
          <p className="muted">Latest responses received for this survey.</p>

          {!results.recent_feedbacks || results.recent_feedbacks.length === 0 ? (
            <p className="muted" style={{ padding: '20px 0' }}>
              No text feedback comments submitted yet.
            </p>
          ) : (
            results.recent_feedbacks.slice(0, 3).map((fb) => (
              <p className="quote" key={fb.id}>
                &ldquo;{fb.text}&rdquo;
              </p>
            ))
          )}

          <div style={{ marginTop: '20px' }}>
            <button className="link" onClick={onViewFeedback}>
              View all customer feedbacks →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SurveyFeedbackView({ feedbackData, onBack, onTriggerAI }) {
  return (
    <>
      <button className="back page-back" onClick={onBack}>
        <ChevronLeft size={16} /> Back to Survey Results
      </button>

      <div className="toolbar">
        <div>
          <h2>{feedbackData.title} — Feedback List</h2>
          <p className="muted">{feedbackData.total_feedback} feedback comments collected</p>
        </div>
        <button className="primary" onClick={onTriggerAI}>
          <Sparkles size={16} /> Trigger AI Analysis
        </button>
      </div>

      <div className="card feedback-list">
        {!feedbackData.feedbacks || feedbackData.feedbacks.length === 0 ? (
          <div className="empty-inline">
            <p>No feedback comments recorded for this survey yet.</p>
          </div>
        ) : (
          feedbackData.feedbacks.map((fb, idx) => (
            <div className="feedback-item" key={fb.id || idx}>
              <div className="feedback-header">
                <div>
                  <b>Customer Response #{idx + 1}</b>
                  <small>{new Date(fb.created_at).toLocaleDateString()}</small>
                </div>
              </div>
              <p>&ldquo;{fb.text}&rdquo;</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function SurveyAIAnalysisView({ aiData, surveyId, onBack, onRefreshAI, loading }) {
  const breakdown = aiData.sentiment_breakdown || { positive: 0, neutral: 0, negative: 0 };

  return (
    <>
      <button className="back page-back" onClick={onBack}>
        <ChevronLeft size={16} /> Back to Survey Results
      </button>

      <div className="ai-hero">
        <span className="spark">
          <Sparkles size={24} />
        </span>
        <div style={{ flex: 1 }}>
          <p className="eyebrow">AUTOMATED AI FEEDBACK INSIGHTS</p>
          <h2>{aiData.survey_title || 'Customer Survey Feedback'}</h2>
          <p>
            Dominant Sentiment: <b>{aiData.sentiment}</b> · Analyzed without modifying raw responses.
          </p>
        </div>
        <button className="secondary" onClick={onRefreshAI} disabled={loading}>
          <RefreshCw size={15} /> {loading ? 'Analyzing…' : 'Re-run AI Analysis'}
        </button>
      </div>

      <div className="split">
        <div className="card">
          <h2>Sentiment Distribution</h2>
          <div className="bars" style={{ marginTop: '16px' }}>
            <div className="bar-row">
              <span>Positive</span>
              <div>
                <i className="green" style={{ width: `${breakdown.positive}%` }} />
              </div>
              <b>{breakdown.positive}%</b>
            </div>
            <div className="bar-row">
              <span>Neutral</span>
              <div>
                <i className="gray" style={{ width: `${breakdown.neutral}%` }} />
              </div>
              <b>{breakdown.neutral}%</b>
            </div>
            <div className="bar-row">
              <span>Negative</span>
              <div>
                <i className="red" style={{ width: `${breakdown.negative}%` }} />
              </div>
              <b>{breakdown.negative}%</b>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Extracted Key Topics</h2>
          <p className="muted">Primary keywords detected in customer comments:</p>
          <div className="topics">
            {(aiData.topics || []).map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="card summary">
        <div className="summary-heading">
          <Sparkles size={22} />
          <h2>Executive AI Summary</h2>
        </div>
        <p>{aiData.summary || 'No feedback analysis available yet.'}</p>
      </div>
    </>
  );
}
