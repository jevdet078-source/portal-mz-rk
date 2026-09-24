import * as React from 'react';
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: string;
  iconColor?: 'primary' | 'success' | 'warning' | 'error';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
}
/** Centered modal dialog with overlay, header icon and footer slot. */
export function Modal(props: ModalProps): React.ReactElement | null;
