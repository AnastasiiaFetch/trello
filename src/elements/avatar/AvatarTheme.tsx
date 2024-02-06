import { avatarAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  avatarAnatomy.keys
);

const baseStyle = definePartsStyle({
  badge: {
    color: '#FAFAFA',
  },
  excessLabel: {
    color: '#FAFAFA',
  },
  container: {
    color: '#FAFAFA',
  },
});

const getSize = (size: string, fontSize: string) => {
  return definePartsStyle({
    container: {
      width: size,
      height: size,
      fontSize: fontSize,
      lineHeight: fontSize,
    },
    excessLabel: {
      width: size,
      height: size,
    },
    label: {
      fontSize: fontSize,
      lineHeight: fontSize,
    },
  });
};

const xs = getSize('8', 'text-xs');
const sm = getSize('10', 'text-sm');
const md = getSize('12', 'text-lg');

export const AvatarTheme = defineMultiStyleConfig({
  baseStyle,
  sizes: { xs, sm, md },
  defaultProps: { size: 'md' },
});
