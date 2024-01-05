import { forwardRef } from 'react';

type IconProps = {
  color: string;
  size: number;
  [key: string]: any;
};

const Attachments = forwardRef(
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
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
    </svg>
  )
);

export default Attachments;
