import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

export interface ButtonProps extends ChakraButtonProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  size = 'sm',
  color = 'brown.camel',
  textColor = 'main.white',
  ...rest
}: ButtonProps) => {
  return (
    <ChakraButton
      size={size}
      bgColor={color}
      color={textColor}
      _hover={{ bgColor: color }}
      height="auto"
      width="100%"
      p="1"
      {...rest}
    />
  );
};

export default Button;
