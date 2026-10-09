import React, { useState } from 'react';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { User, UserRole } from '../types';
import { api } from '../services/api';
import { UserPlus, LogIn } from 'lucide-react';

export interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [email, setEmail] = useState('researcher@insightflow.com');
  const [password, setPassword] = useState('password');

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await api.login(email, password);
      onLoginSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      // Register directly as RESPONDENT per requirement
      const res = await api.register(regEmail, regPassword, regFullName, 'RESPONDENT');
      onLoginSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: UserRole) => {
    try {
      setLoading(true);
      setError('');
      const user = await api.loginAsRole(role);
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Header Info */}
      <div style={{ marginBottom: '24px' }}>
        <p className="eyebrow">AI CUSTOMER FEEDBACK & SURVEY PLATFORM</p>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-primary)' }}>
          {authMode === 'login' ? 'Welcome back' : 'Create an account'}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>
          {authMode === 'login'
            ? 'Sign in to explore surveys, analytics, and AI insights.'
            : 'Join as a Respondent to share your valuable thoughts and take surveys.'}
        </p>
      </div>

      {/* Auth Mode Tabs */}
      <div
        style={{
          display: 'flex',
          backgroundColor: '#eaf1ec',
          padding: '4px',
          borderRadius: 'var(--radius-12)',
          marginBottom: '24px'
        }}
      >
        <button
          type="button"
          onClick={() => {
            setAuthMode('login');
            setError('');
          }}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: 'none',
            borderRadius: 'var(--radius-8)',
            backgroundColor: authMode === 'login' ? 'var(--color-white)' : 'transparent',
            color: authMode === 'login' ? 'var(--color-main)' : 'var(--color-text-secondary)',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: authMode === 'login' ? 'var(--shadow-sm)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <LogIn size={16} />
          Sign in
        </button>

        <button
          type="button"
          onClick={() => {
            setAuthMode('register');
            setError('');
          }}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: 'none',
            borderRadius: 'var(--radius-8)',
            backgroundColor: authMode === 'register' ? 'var(--color-white)' : 'transparent',
            color: authMode === 'register' ? 'var(--color-main)' : 'var(--color-text-secondary)',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: authMode === 'register' ? 'var(--shadow-sm)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <UserPlus size={16} />
          Register (Respondent)
        </button>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* LOGIN FORM */}
      {authMode === 'login' && (
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            disabled={loading}
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            style={{ width: '100%', marginTop: '8px', padding: '14px', fontSize: '15px' }}
          >
            Sign in
          </Button>
        </form>
      )}

      {/* REGISTER FORM (Respondent) */}
      {authMode === 'register' && (
        <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            label="Full Name"
            type="text"
            required
            value={regFullName}
            onChange={(e) => setRegFullName(e.target.value)}
            placeholder="e.g. Alex Johnson"
            disabled={loading}
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            placeholder="alex.respondent@example.com"
            disabled={loading}
          />

          <Input
            label="Password (min 6 characters)"
            type="password"
            required
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
          />

          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#eef7f2',
              borderRadius: 'var(--radius-8)',
              border: '1px solid #c9e6d4',
              fontSize: '13px',
              color: 'var(--color-secondary)',
              marginBottom: '16px'
            }}
          >
            ✓ You will register as a <b>Respondent</b> to take published surveys and submit feedback.
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            style={{ width: '100%', padding: '14px', fontSize: '15px' }}
          >
            Create Account & Sign In
          </Button>
        </form>
      )}

      {/* Demo Role Switcher matching Prototype */}
      <div
        style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid var(--color-border)',
          textAlign: 'center'
        }}
      >
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '14px', fontWeight: 600 }}>
          Or explore with a demo account:
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={loading}
            onClick={() => handleDemoLogin('ADMIN')}
          >
            Admin
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={loading}
            onClick={() => handleDemoLogin('RESEARCHER')}
          >
            Researcher
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={loading}
            onClick={() => handleDemoLogin('RESPONDENT')}
          >
            Respondent
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={loading}
            onClick={() => handleDemoLogin('MANAGER')}
          >
            Manager
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
