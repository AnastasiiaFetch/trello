import { forwardRef } from 'react';

type IconProps = {
  color: string;
  size: number;
  [key: string]: any;
};

const EyeOpen = forwardRef(
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  )
);

export default EyeOpen;
