import * as React from 'react';
export interface RadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: any) => void;
  name?: string;
  value?: any;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** Single radio control. */
export function Radio(props: RadioProps): React.ReactElement;
