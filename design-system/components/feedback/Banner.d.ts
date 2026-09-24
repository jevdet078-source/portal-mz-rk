import * as React from 'react';
export interface BannerProps {
  state?: 'info' | 'success' | 'warning' | 'error' | 'feature';
  variant?: 'filled' | 'light' | 'stroke';
  children?: React.ReactNode;
  icon?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
/** Full-width announcement banner. */
export function Banner(props: BannerProps): React.ReactElement;
