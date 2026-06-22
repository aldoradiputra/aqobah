import * as React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  variant?: 'neutral' | 'brand' | 'accent' | 'seal' | 'success' | 'warning' | 'danger';
  /** Soft tonal fill vs solid. @default true */
  soft?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Compact status, category, or trust marker. */
export function Badge(props: BadgeProps): JSX.Element;
