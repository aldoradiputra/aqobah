import * as React from 'react';

export interface StatBlockProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  onDark?: boolean;
  /** @default "left" */
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}

/** Headline metric + label for track-record / trust stats. */
export function StatBlock(props: StatBlockProps): JSX.Element;
