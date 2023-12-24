import { forwardRef } from 'react';

type Props = {
  color: string;
  size: number;
  [key: string]: any;
};

const Search = forwardRef(({ color = 'currentColor', size = 24, ...rest }: Props, ref: any) => (
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
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
));

export default Search;
