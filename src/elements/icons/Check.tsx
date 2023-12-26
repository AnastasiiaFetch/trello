import { forwardRef } from 'react';

type Props = {
  color: string;
  size: number;
  [key: string]: any;
};

const Check = forwardRef(({ color = 'currentColor', size = 24, ...rest }: Props, ref: any) => (
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
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
));

export default Check;
