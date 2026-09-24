import * as React from 'react';
export interface AccordionProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  icon?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}
/** Collapsible disclosure panel. */
export function Accordion(props: AccordionProps): React.ReactElement;
