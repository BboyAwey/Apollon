import React, { SFC } from 'react';
import { ObjectName } from './object-name';

export const ObjectNameComponent: SFC<Props> = ({ element, children }) => (
  <g>
    <rect width="100%" height="100%" stroke="#ff6633" />
    <svg height={element.headerHeight}>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontWeight="bold" textDecoration="underline">
        {element.name}
      </text>
    </svg>
    {children}
    <rect width="100%" height="100%" stroke="#ff6633" fill="none" pointerEvents="none" />
    <path d={`M 0 ${element.headerHeight} H ${element.bounds.width}`} stroke="#ff6633" />
    <path d={`M 0 ${element.deviderPosition} H ${element.bounds.width}`} stroke="#ff6633" />
  </g>
);

interface Props {
  element: ObjectName;
}
