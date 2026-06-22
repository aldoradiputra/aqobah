import * as React from 'react';

/**
 * Section header lockup props.
 */
export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** @default "left" */
  align?: 'left' | 'center';
  /** Render light text for dark/brand backgrounds. @default false */
  onDark?: boolean;
  style?: React.CSSProperties;
}

/**
 * Section header lockup: uppercase eyebrow with gold rule, Aref Ruqaa display title, Lora subtitle.
 */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
