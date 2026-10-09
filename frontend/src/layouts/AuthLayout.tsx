import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: 'var(--color-bg)'
      }}
      className="auth-layout"
    >
      {/* Left Column: Sign In Form & Branding */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 24px'
        }}
      >
        <div style={{ maxWidth: '420px', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '32px'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-8)',
                backgroundColor: 'var(--color-ai-accent)',
                color: 'var(--color-main)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              <MessageSquare size={20} />
            </div>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--color-main)',
                letterSpacing: '-0.02em'
              }}
            >
              InsightFlow
            </span>
          </div>

          {children}
        </div>
      </div>

      {/* Right Column: AI Hero Banner */}
      <div
        className="auth-hero-pane"
        style={{
          flex: 1.1,
          backgroundColor: 'var(--color-main)',
          color: 'var(--color-white)',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '480px', zIndex: 1 }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-12)',
              backgroundColor: 'var(--color-ai-accent)',
              color: 'var(--color-main)',
              display: 'grid',
              placeItems: 'center',
              marginBottom: '28px'
            }}
          >
            <Sparkles size={24} />
          </div>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--color-white)',
              lineHeight: 1.25,
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}
          >
            Turn feedback into better decisions.
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#bdd3c5',
              lineHeight: 1.6
            }}
          >
            Create surveys, collect customer insights and understand feedback with automated AI sentiment, topic categorization, and executive summaries.
          </p>
        </div>

        {/* Decorative backdrop glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184, 237, 100, 0.12) 0%, rgba(25, 59, 43, 0) 70%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .auth-hero-pane {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
