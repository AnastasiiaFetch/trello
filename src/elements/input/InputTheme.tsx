import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';

import { inputAnatomy } from '@chakra-ui/anatomy';
import { useMainColor } from '../../composable/useMainColor';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

const baseStyle = definePartsStyle({
  field: {
    width: '100%',
    outline: '1px solid',
    outlineColor: 'transparent',
  },
});

const variantDefault = definePartsStyle(() => {
  const { darkColor } = useMainColor();
  return {
    field: {
      border: '1px solid',
      boxShadow: 'xs',
      borderColor: 'var(--chakra-colors-gray-300)',
      bg: 'inherit',
      borderRadius: '0.5rem',
      height: 'auto',
      color: darkColor,
      _placeholder: {
        color: 'var(--chakra-colors-gray-500)',
      },
      _hover: {
        _disabled: {
          _placeholder: {
            color: 'var(--chakra-colors-gray-500)',
          },
        },
      },
      _readOnly: {
        boxShadow: 'none',
        bg: 'var(--chakra-colors-gray-50)',
        borderColor: 'var(--chakra-colors-gray-300)',
        userSelect: 'all',
      },
      _focusVisible: {
        color: 'var(--chakra-colors-gray-900)',
      },
      _disabled: {
        boxShadow: 'none',
        bg: 'var(--chakra-colors-gray-50)',
        borderColor: 'var(--chakra-colors-gray-300)',
        userSelect: 'none',
        cursor: 'not-allowed',
        color: 'var(--chakra-colors-gray-500)',
      },
      _invalid: {
        borderColor: 'var(--chakra-colors-error-300)',
        _focusVisible: {
          borderColor: 'var(--chakra-colors-error-300)',
          boxShadow: 'xs-error-focus',
        },
      },
    },

    element: {
      transform: 'translateY(-50%)',
    },
  };
});

const sizes = {
  xs: definePartsStyle({
    field: {
      py: '1.5',
      px: '2.5',
      lineHeight: 'text-sm',
      fontSize: 'text-sm',
    },
  }),
  sm: definePartsStyle({
    field: {
      py: '2',
      px: '3',
      lineHeight: 'text-md',
      fontSize: 'text-md',
    },
  }),
  md: definePartsStyle({
    field: {
      py: '2.5',
      px: '3.5',
      lineHeight: 'text-md',
      fontSize: 'text-md',
    },
  }),
};

export const InputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: { default: variantDefault },
});

export const InputLabelTheme = defineStyleConfig({
  baseStyle: {
    fontWeight: 'semibold',
    fontSize: 'text-sm',
    lineHeight: 'text-sm',
    marginBottom: '2',
  },
});

export const InputHelpTextTheme = defineStyleConfig({
  baseStyle: {
    fontWeight: 'regular',
    fontSize: 'text-xs',
    lineHeight: 'text-sm',
    color: 'var(--chakra-colors-gray-400) !important',
    mt: 'var(--chakra-space-1-5) !important',
  },
});

export const InputErrorTextTheme = defineStyleConfig({
  baseStyle: {
    ...InputHelpTextTheme.baseStyle,
    color: 'red.500',
  },
});
