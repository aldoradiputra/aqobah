import * as React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  /** @default "sm" */
  elevation?: 'flat' | 'sm' | 'md' | 'lg';
  /** @default "md" */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Premium gold hairline along the top edge. @default false */
  goldTop?: boolean;
  /** Lift + deepen shadow on hover. @default false */
  interactive?: boolean;
  style?: React.CSSProperties;
}

/** Soft elevated surface container with optional gold premium edge. */
export function Card(props: CardProps): JSX.Element;
