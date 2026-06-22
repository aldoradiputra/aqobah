import * as React from 'react';

export interface PackageBadge {
  label: string;
  variant?: 'neutral' | 'brand' | 'accent' | 'seal' | 'success' | 'warning' | 'danger';
}

/**
 * Umrah / hajj package offer card props.
 */
export interface PackageCardProps {
  title: string;
  image?: string;
  badge?: PackageBadge | null;
  duration?: string;
  departure?: string;
  hotelStars?: number | string | null;
  facilities?: string[];
  /** @default "Mulai dari" */
  priceLabel?: string;
  price: string;
  rating?: string | number | null;
  onSelect?: () => void;
  style?: React.CSSProperties;
}

/**
 * Umrah / hajj package offer card — image, trust badge, facilities, price + CTA.
 */
export function PackageCard(props: PackageCardProps): JSX.Element;
