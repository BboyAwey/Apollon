import React, { SFC } from 'react';
import { Package } from './package';

export const PackageComponent: SFC<Props> = ({ element, children }) => (
  <g>
    <path d={`M 0 20 V 10 C 0 5 0 0 10 0 H 30 C 40 0 40 5 40 10`} stroke="#795548" />
    <rect y="10" width="100%" height={element.bounds.height - 10} stroke="#795548" rx="10" ry="10"/>
    <text x="50%" y="25" dy={10} textAnchor="middle" fontWeight="bold">
      {element.name}
    </text>
    {children}
  </g>
);

interface Props {
  element: Package;
}
