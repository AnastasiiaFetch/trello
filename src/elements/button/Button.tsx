import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  useStyleConfig,
} from '@chakra-ui/react';
import { JSXElementConstructor, ReactElement } from 'react';

export interface ButtonProps extends ChakraButtonProps {
  variant?: 'primary' | 'secondary' | 'secondaryGray';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
  rightIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
  color?: string;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { variant = 'primary', size = 'sm', fullWidth, color, ...rest } = props;

  const styles = useStyleConfig('Button', { variant, size, fullWidth, color });

  return <ChakraButton __css={styles} height="auto" {...rest} />;
};

export default Button;
