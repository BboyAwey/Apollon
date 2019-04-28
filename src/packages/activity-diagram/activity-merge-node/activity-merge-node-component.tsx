import React, { SFC } from 'react';
import {ActivityMergeNode} from './activity-merge-node';

export const ActivityMergeNodeComponent: SFC<Props> = ({ element }) => (
  <g>
    <polyline
      points={`${element.bounds.width / 2} 0, ${element.bounds.width} ${element
        .bounds.height / 2}, ${element.bounds.width / 2} ${
        element.bounds.height
      }, 0 ${element.bounds.height / 2}, ${element.bounds.width / 2} 0`}
      stroke="#ff6633"
    />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontWeight="bold"
    >
      {element.name}
    </text>
  </g>
);

interface Props {
  element: ActivityMergeNode;
}
