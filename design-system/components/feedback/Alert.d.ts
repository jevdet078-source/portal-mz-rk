import * as React from 'react';
/** Inline alert with icon, title, body and optional dismiss/action. */
export interface AlertProps {
  state?: 'info' | 'success' | 'warning' | 'error' | 'feature';
  variant?: 'filled' | 'light' | 'stroke';
  title?: React.ReactNode;
  children?: React.ReactNode;
  icon?: string;
  onClose?: () => void;
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export function Alert(props: AlertProps): React.ReactElement;
