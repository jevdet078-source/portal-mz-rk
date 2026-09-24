import * as React from 'react';
export type BadgeColor = 'gray' | 'blue' | 'orange' | 'red' | 'green' | 'yellow' | 'purple' | 'teal' | 'pink';
/** Compact pill for counts, labels and statuses. */
export interface BadgeProps {
  children?: React.ReactNode;
  color?: BadgeColor;
  variant?: 'filled' | 'light' | 'lighter' | 'stroke';
  size?: 'small' | 'medium';
  leadingIcon?: string;
  dot?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): React.ReactElement;
