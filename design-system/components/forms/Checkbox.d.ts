import * as React from 'react';
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** Checkbox with checked / indeterminate / disabled states. */
export function Checkbox(props: CheckboxProps): React.ReactElement;
