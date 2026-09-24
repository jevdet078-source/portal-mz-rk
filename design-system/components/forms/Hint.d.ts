import * as React from 'react';
export interface HintProps {
  children: React.ReactNode;
  state?: 'default' | 'error' | 'success';
  icon?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** Helper / validation message shown beneath a field. */
export function Hint(props: HintProps): React.ReactElement;
