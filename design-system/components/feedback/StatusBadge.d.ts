import * as React from 'react';
export interface StatusBadgeProps {
  status?: 'online' | 'away' | 'busy' | 'offline' | 'pending' | 'completed' | 'cancelled' | 'in_progress';
  children?: React.ReactNode;
  color?: string;
  variant?: 'stroke' | 'light';
  className?: string;
  style?: React.CSSProperties;
}
/** Dot + label status indicator. */
export function StatusBadge(props: StatusBadgeProps): React.ReactElement;
