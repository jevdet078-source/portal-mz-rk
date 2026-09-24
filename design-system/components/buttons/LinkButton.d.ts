import * as React from 'react';

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'neutral' | 'error' | 'white';
  size?: 'small' | 'medium' | 'large';
  underline?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  disabled?: boolean;
}

/** Text-only inline action / link. */
export function LinkButton(props: LinkButtonProps): React.ReactElement;
