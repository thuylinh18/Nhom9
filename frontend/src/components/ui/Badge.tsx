import React from 'react';

export interface BadgeProps {
  type: 'Draft' | 'Published' | 'Closed' | 'Positive' | 'Neutral' | 'Negative' | string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ type, size = 'md' }) => {
  const norm = String(type).trim().toLowerCase();
  let badgeClass = 'badge-draft';

  if (norm === 'published') badgeClass = 'badge-published';
  else if (norm === 'closed') badgeClass = 'badge-closed';
  else if (norm === 'positive') badgeClass = 'badge-positive';
  else if (norm === 'neutral') badgeClass = 'badge-neutral';
  else if (norm === 'negative') badgeClass = 'badge-negative';

  const dotColor =
    norm === 'published' || norm === 'positive'
      ? '#276746'
      : norm === 'negative'
      ? '#A33E3B'
      : norm === 'closed'
      ? '#A66B16'
      : '#789087';

  return (
    <span
      className={`badge ${badgeClass}`}
      style={size === 'sm' ? { fontSize: '11px', padding: '2px 8px' } : undefined}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: dotColor,
          display: 'inline-block'
        }}
      />
      {type}
    </span>
  );
};
