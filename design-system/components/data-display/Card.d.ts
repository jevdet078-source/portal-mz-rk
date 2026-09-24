import * as React from 'react';
/** Surface container with hairline ring, radius and optional hover lift. */
export interface CardProps {
  children?: React.ReactNode;
  padding?: number;
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): React.ReactElement;
