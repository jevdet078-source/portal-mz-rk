import * as React from 'react';

/** Primary action button. Three intents × four modes × four sizes. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color intent. */
  variant?: 'primary' | 'neutral' | 'error';
  /** Visual treatment. */
  mode?: 'filled' | 'stroke' | 'lighter' | 'ghost';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  /** RemixIcon name without the `ri-` prefix, e.g. "add-line". */
  leadingIcon?: string;
  trailingIcon?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export function Button(props: ButtonProps): React.ReactElement;
