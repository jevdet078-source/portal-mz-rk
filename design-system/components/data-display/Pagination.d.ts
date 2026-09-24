import * as React from 'react';
export interface PaginationProps {
  page?: number;
  total?: number;
  onChange?: (page: number) => void;
  siblings?: number;
  className?: string;
  style?: React.CSSProperties;
}
/** Page navigation with prev/next and ellipsis. */
export function Pagination(props: PaginationProps): React.ReactElement;
