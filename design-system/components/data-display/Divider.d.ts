import * as React from 'react';
export interface DividerProps {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}
/** Divider line, optionally with a centered label. */
export function Divider(props: DividerProps): React.ReactElement;
