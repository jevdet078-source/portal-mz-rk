import * as React from 'react';
export interface TabItem { value: string; label: React.ReactNode; icon?: string; badge?: React.ReactNode; }
export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: 'underline' | 'pill';
  className?: string;
  style?: React.CSSProperties;
}
/** Tab bar — underline or segmented pill style. */
export function Tabs(props: TabsProps): React.ReactElement;
