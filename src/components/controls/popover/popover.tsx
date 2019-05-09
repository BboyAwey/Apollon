import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { Arrow, PopoverBody, PopoverContainer, PopoverMask } from './popover-styles';

export type Props = {
  children?: ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  position: { x: number; y: number };
} & HTMLAttributes<HTMLDivElement>;

export const Popover = forwardRef<HTMLDivElement, Props>(({ children, placement = 'right', ...props }, ref) => (
  <PopoverMask>
    <PopoverContainer ref={ref} placement={placement} {...props}>
      {/* <Arrow placement={placement} /> */}
      <PopoverBody>{children}</PopoverBody>
    </PopoverContainer>
  </PopoverMask>
));
