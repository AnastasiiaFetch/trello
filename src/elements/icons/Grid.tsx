import { forwardRef } from 'react';

type IconProps = {
  color: string;
  size: number;
  [key: string]: any;
};

const Grid = forwardRef(({ color = 'currentColor', size = 24, ...rest }: IconProps, ref: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
));

export default Grid;
