import * as React from 'react';
import { AvatarProps } from './Avatar';
export interface AvatarGroupProps {
  items: Omit<AvatarProps, 'size'>[];
  size?: number;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
}
/** Overlapping avatar stack with +N overflow. */
export function AvatarGroup(props: AvatarGroupProps): React.ReactElement;
