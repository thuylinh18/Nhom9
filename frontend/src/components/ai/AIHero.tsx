import React from 'react';
import { Sparkles } from 'lucide-react';

export interface AIHeroProps {
  title: string;
  subtitle: string;
  badgeText?: string;
  action?: React.ReactNode;
}

export const AIHero: React.FC<AIHeroProps> = ({
  title,
  subtitle,
  badgeText = 'AI-POWERED INSIGHTS',
  action
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-main)',
        color: 'var(--color-white)',
        borderRadius: 'var(--radius-12)',
        padding: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', zIndex: 1 }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-12)',
            backgroundColor: 'var(--color-ai-accent)',
            color: 'var(--color-main)',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0
          }}
        >
          <Sparkles size={26} />
        </div>
        <div>
          <div
            style={{
              textTransform: 'uppercase',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--color-ai-accent)',
              marginBottom: '4px'
            }}
          >
            {badgeText}
          </div>
          <h2 style={{ color: 'var(--color-white)', fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0' }}>
            {title}
          </h2>
          <p style={{ color: '#c4d7cc', margin: 0, fontSize: '14px' }}>{subtitle}</p>
        </div>
      </div>

      {action && <div style={{ zIndex: 1 }}>{action}</div>}

      {/* Subtle background glow circle */}
      <div
        style={{
          position: 'absolute',
          right: '-50px',
          bottom: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184, 237, 100, 0.15) 0%, rgba(25, 59, 43, 0) 70%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};
