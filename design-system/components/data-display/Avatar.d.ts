import * as React from 'react';
/** Circular avatar — image, initials, or icon, with optional status dot. */
export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  color?: 'gray' | 'blue' | 'purple' | 'orange' | 'green' | 'yellow';
  size?: 20 | 24 | 32 | 40 | 48 | 56 | 64 | 80;
  status?: 'online' | 'away' | 'busy' | 'offline';
  className?: string;
  style?: React.CSSProperties;
}
export function Avatar(props: AvatarProps): React.ReactElement;
