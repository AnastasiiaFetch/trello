import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

export interface ButtonProps extends ChakraButtonProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  textColor?: string;
  icon: any;
}

const IconButton: React.FC<ButtonProps> = ({
  size = 'sm',
  color = 'transparent',
  icon,
  ...rest
}: ButtonProps) => {
  return (
    <ChakraButton
      size={size}
      bgColor={color}
      _hover={{ bgColor: color }}
      height="auto"
      width="fit-content"
      p="1"
      {...rest}
    >
      {icon}
    </ChakraButton>
  );
};

export default IconButton;
