import * as React from 'react';
export interface BreadcrumbItem { label: React.ReactNode; href?: string; icon?: string; }
export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  style?: React.CSSProperties;
}
/** Breadcrumb navigation trail. */
export function Breadcrumbs(props: BreadcrumbsProps): React.ReactElement;
