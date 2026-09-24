import * as React from 'react';
/** Text input with optional leading/trailing icons, focus ring and error state. */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
  /** RemixIcon name without `ri-`. */
  leadingIcon?: string;
  trailingIcon?: string;
  error?: boolean;
  inputStyle?: React.CSSProperties;
}
export function Input(props: InputProps): React.ReactElement;
