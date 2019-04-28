import React, { SFC } from 'react';
import { Classifier } from './classifier';

export const ClassifierComponent: SFC<Props> = ({ element, children }) => {
  let color: string = '#4caf50';
  if (element.isAbstract) color = '#03a9f4';
  if (element.isInterface) color = '#673ab7';
  if (element.isEnumeration) color = '#ff5722';
  return (
    <g width="100%" height="100%">
      <rect width="100%" height="100%"/>      
      {element.isInterface || element.isEnumeration ? (
        <svg height={element.headerHeight}>
          <path d={`M 10 0 H ${element.bounds.width - 10} C ${element.bounds.width - 5} 0 ${element.bounds.width} 5 ${element.bounds.width} 10 V ${element.headerHeight - 10} V ${element.headerHeight} H 0 V 10 C 0 5 5 0 10 0`} fill={color}/> 
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontWeight="bold">
            <tspan x="50%" dy={-8} textAnchor="middle" fontSize="85%" fill="#ccc">
              {element.isInterface && '«interface»'}
              {element.isEnumeration && '«enumeration»'}
            </tspan>
            <tspan x="50%" dy={18} textAnchor="middle" fill="white">
              {element.name}
            </tspan>
          </text>
        </svg>
      ) : (
        <svg height={element.headerHeight}>
          <path d={`M 10 0 H ${element.bounds.width - 10} C ${element.bounds.width - 5} 0 ${element.bounds.width} 5 ${element.bounds.width} 10 V ${element.headerHeight - 10} V ${element.headerHeight} H 0 V 10 C 0 5 5 0 10 0`} fill={color}/> 
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontStyle={element.isAbstract ? 'italic' : 'normal'}
            fontWeight="bold">
            <tspan fill="white">{element.name}</tspan>
          </text>
        </svg>
      )}
      {children}
      <rect width="100%" height="100%" stroke={color} fill="none" pointerEvents="none" rx="10" ry="10"/>
      {/* { element.headerHeight && <path d={`M 0 ${element.headerHeight} H ${element.bounds.width}`} stroke={color} /> } */}
      { element.deviderPosition && <path d={`M 0 ${element.deviderPosition} H ${element.bounds.width}`} stroke={color} /> }
    </g>
  );
};

interface Props {
  element: Classifier;
}
