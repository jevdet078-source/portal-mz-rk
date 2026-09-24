import * as React from 'react';
export interface SelectOption { value: string; label: string; }
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'small' | 'medium' | 'large';
  leadingIcon?: string;
  error?: boolean;
  options?: SelectOption[];
  placeholder?: string;
}
/** Styled select / dropdown. Pass `options` or `<option>` children. */
export function Select(props: SelectProps): React.ReactElement;
