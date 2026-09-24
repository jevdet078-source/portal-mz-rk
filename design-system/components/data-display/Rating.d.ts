import * as React from 'react';
export interface RatingProps {
  value?: number;
  max?: number;
  size?: number;
  onChange?: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
}
/** Star rating, read-only or interactive. */
export function Rating(props: RatingProps): React.ReactElement;
