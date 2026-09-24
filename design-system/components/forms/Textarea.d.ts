import * as React from 'react';
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  showCounter?: boolean;
}
/** Multi-line text area with optional character counter. */
export function Textarea(props: TextareaProps): React.ReactElement;
