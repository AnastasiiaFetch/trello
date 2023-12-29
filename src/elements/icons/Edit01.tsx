import { forwardRef } from 'react';

type Props = {
  color: string;
  size: number;
  [key: string]: any;
};

const Edit01 = forwardRef(({ color = 'currentColor', size = 24, ...rest }: Props, ref: any) => (
  <svg
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
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
));

export default Edit01;
