import { forwardRef } from 'react';

type IconProps = {
  color: string;
  size: number;
  [key: string]: any;
};

const ChevronRight = forwardRef(({ color = 'white', size = 24, ...rest }: IconProps, ref: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...rest}
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
));

export default ChevronRight;
