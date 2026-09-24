import * as React from 'react';

export interface FancyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'neutral' | 'error';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  leadingIcon?: string;
  trailingIcon?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

/** Raised, glossy CTA button with inset highlight + soft drop shadow. */
export function FancyButton(props: FancyButtonProps): React.ReactElement;
