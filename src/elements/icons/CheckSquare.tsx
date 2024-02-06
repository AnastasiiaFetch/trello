import { forwardRef } from 'react';

type IconProps = {
  color: string;
  size: number;
  [key: string]: any;
};

const CheckSquare = forwardRef(
  ({ color = 'currentColor', size = 24, ...rest }: IconProps, ref: any) => (
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
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  )
);

export default CheckSquare;
