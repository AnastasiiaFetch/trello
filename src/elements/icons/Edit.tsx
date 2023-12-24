import { forwardRef } from 'react';

type Props = {
  color: string;
  size: number;
  [key: string]: any;
};

const Edit = forwardRef(({ color = 'currentColor', size = 24, ...rest }: Props, ref: any) => (
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
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
));

export default Edit;
