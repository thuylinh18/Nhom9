import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  required,
  error,
  helperText,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`form-input ${error ? 'input-has-error' : ''} ${className}`}
        style={error ? { borderColor: 'var(--color-error)' } : undefined}
        required={required}
        {...props}
      />
      {error && <span className="form-error-text">{error}</span>}
      {helperText && !error && <span className="form-helper-text">{helperText}</span>}
    </div>
  );
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  required,
  error,
  helperText,
  id,
  className = '',
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={textareaId} className="form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`form-textarea ${error ? 'input-has-error' : ''} ${className}`}
        style={error ? { borderColor: 'var(--color-error)' } : undefined}
        required={required}
        {...props}
      />
      {error && <span className="form-error-text">{error}</span>}
      {helperText && !error && <span className="form-helper-text">{helperText}</span>}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: string;
  options: Array<{ label: string; value: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  required,
  error,
  options,
  id,
  className = '',
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`form-select ${className}`}
        style={error ? { borderColor: 'var(--color-error)' } : undefined}
        required={required}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="form-error-text">{error}</span>}
    </div>
  );
};
