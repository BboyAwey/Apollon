import React, { SFC } from 'react';
import {ActivityActionNode} from './activity-action-node';

export const ActivityActionNodeComponent: SFC<Props> = ({ element }) => (
  <g>
    <rect rx={10} ry={10} width="100%" height="100%" stroke="#ff6633" />
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
  element: ActivityActionNode;
}
