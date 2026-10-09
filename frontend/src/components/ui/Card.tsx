import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  interactive = false,
  style,
  ...props
}) => {
  return (
    <div
      className={`card ${interactive ? 'card-interactive' : ''} ${className}`}
      style={{
        cursor: interactive ? 'pointer' : 'default',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};
