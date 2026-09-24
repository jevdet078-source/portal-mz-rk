import * as React from 'react';
export interface ProgressBarProps {
  value?: number;
  color?: 'primary' | 'green' | 'orange' | 'red' | 'blue' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/** Linear progress bar (0–100). */
export function ProgressBar(props: ProgressBarProps): React.ReactElement;
