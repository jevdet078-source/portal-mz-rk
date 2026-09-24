import * as React from 'react';
export interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
/** Hover/focus tooltip bubble. */
export function Tooltip(props: TooltipProps): React.ReactElement;
