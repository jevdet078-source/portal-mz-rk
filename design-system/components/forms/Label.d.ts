import * as React from 'react';
export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  sublabel?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/** Field label with optional required asterisk and sub-label. */
export function Label(props: LabelProps): React.ReactElement;
