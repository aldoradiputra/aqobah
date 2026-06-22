import * as React from 'react';

export interface FacilityItemProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  style?: React.CSSProperties;
}

/** Icon tile + title + short description for facility grids. */
export function FacilityItem(props: FacilityItemProps): JSX.Element;
