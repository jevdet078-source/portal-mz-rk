import * as React from 'react';
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** On/off toggle switch. */
export function Switch(props: SwitchProps): React.ReactElement;
