import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ai' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { height: '36px', minHeight: '36px', padding: '0 14px', fontSize: '13px', borderRadius: 'var(--radius-8)' },
    md: { height: '44px', minHeight: '44px', padding: '0 18px', fontSize: '14px', borderRadius: '10px' },
    lg: { height: '48px', minHeight: '48px', padding: '0 22px', fontSize: '15px', borderRadius: '10px' }
  };

  const isLink = variant === 'link';

  return (
    <button
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || loading}
      style={{
        ...(!isLink ? sizeStyles[size] : {}),
        ...style
      }}
      {...props}
    >
      {loading ? (
        <span
          style={{
            width: '15px',
            height: '15px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: variant === 'secondary' || variant === 'link' ? 'var(--color-main)' : '#ffffff',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            display: 'inline-block'
          }}
        />
      ) : (
        icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
