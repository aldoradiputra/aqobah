import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Labelled text field with focus ring, hint, and error states. */
export function Input(props: InputProps): JSX.Element;
