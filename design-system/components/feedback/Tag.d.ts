import * as React from 'react';
export interface TagProps {
  children?: React.ReactNode;
  variant?: 'stroke' | 'gray';
  leadingIcon?: string;
  onDismiss?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/** Rectangular chip/tag with optional icon and dismiss. */
export function Tag(props: TagProps): React.ReactElement;
