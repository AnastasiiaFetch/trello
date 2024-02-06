import { JSXElementConstructor, ReactElement } from 'react';

import type { InputProps as ChakraInputProps } from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {
  size?: 'xs' | 'sm' | 'md';
  label?: string | null;
  placeholder?: string | undefined;
  type?: string;
  containerProps?: any;
  infoPopover?: string | React.ReactNode;
  // form control
  isDisabled?: boolean;
  isError?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  // help text
  helpText?: string | null;
  // elements like icons
  leftElement?: ReactElement<any, string | JSXElementConstructor<any>>;
  rightElement?: ReactElement<any, string | JSXElementConstructor<any>> | false | string;
}
