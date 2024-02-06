import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  useStyleConfig,
} from '@chakra-ui/react';

export interface IconButtonProps extends ChakraIconButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  const { variant, size, ...rest } = props;

  const styles = useStyleConfig('IconButton', { variant, size });

  return <ChakraIconButton __css={styles} {...rest} />;
};

export default Button;
