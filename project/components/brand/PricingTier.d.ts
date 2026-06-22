import * as React from 'react';

export interface PricingTierProps {
  /** Big IDR figure in juta, e.g. "270". */
  price: string;
  /** @default "Jt" */
  unit?: string;
  /** USD equivalent subline, e.g. "USD 15.500". */
  usd?: string;
  /** Occupancy label, e.g. "QUAD" | "TRIPLE" | "DOUBLE". */
  occupancy: string;
  /** Gold-highlighted recommended tier. @default false */
  featured?: boolean;
  style?: React.CSSProperties;
}

/** Room-occupancy price tile for haji/umrah brochures (Quad / Triple / Double). */
export function PricingTier(props: PricingTierProps): JSX.Element;
