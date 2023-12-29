import {
  Box,
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
  useStyleConfig,
} from '@chakra-ui/react';
import User from '../icons/User';
import { JSXElementConstructor, ReactElement } from 'react';
import { useMainColor } from '../../composable/useMainColor';

export interface ButtonProps extends ChakraAvatarProps {
  size: 'xs' | 'sm' | 'md';
  borderRadius?: 'md' | 'full';
  icon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
}

const Avatar: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { size, icon, borderRadius = 'full', ...rest } = props;

  const styles = useStyleConfig('Avatar', { size });
  const { darkColor } = useMainColor();

  return (
    <Box as="span" display="inline-flex" cursor="pointer">
      <ChakraAvatar
        __css={styles}
        size={size}
        bg={darkColor}
        {...rest}
        borderRadius={borderRadius}
        icon={icon ? icon : <User color="#FAFAFA" />}
      />
    </Box>
  );
};

export default Avatar;
