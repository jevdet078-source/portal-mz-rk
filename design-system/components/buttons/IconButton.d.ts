import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** RemixIcon name without the `ri-` prefix. */
  icon: string;
  variant?: 'primary' | 'neutral' | 'error';
  mode?: 'filled' | 'stroke' | 'lighter' | 'ghost';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  disabled?: boolean;
}

/** Square, icon-only button. Same intent/mode/size system as Button. */
export function IconButton(props: IconButtonProps): React.ReactElement;
