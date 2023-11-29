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
      borderColor: 'gray.300',
      bg: 'inherit',
      boxShadow: 'xs',
      borderRadius: '0.5rem',
      height: 'auto',
      color: darkColor,
      _placeholder: {
        color: 'gray.500',
      },
      _hover: {
        _disabled: {
          _placeholder: {
            color: 'gray.500',
          },
        },
      },
      _focusVisible: {
        color: 'gray.900',
        borderColor: 'primary.300',
        boxShadow: 'xs-primary-focus',
      },
      _readOnly: {
        boxShadow: 'none',
        bg: 'gray.50',
        borderColor: 'gray.300',
        userSelect: 'all',
      },
      _disabled: {
        boxShadow: 'none',
        bg: 'gray.50',
        borderColor: 'gray.300',
        userSelect: 'none',
        cursor: 'not-allowed',
        color: 'gray.500',
      },
      _invalid: {
        borderColor: 'error.300',
        _focusVisible: {
          borderColor: 'error.300',
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
      px: '2.5',
      py: '1.5',
      fontSize: 'text-sm',
      lineHeight: 'text-sm',
    },
  }),
  sm: definePartsStyle({
    field: {
      px: '3',
      py: '2',
      fontSize: 'text-md',
      lineHeight: 'text-md',
    },
  }),
  md: definePartsStyle({
    field: {
      px: '3.5',
      py: '2.5',
      fontSize: 'text-md',
      lineHeight: 'text-md',
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
    fontSize: 'text-md',
    lineHeight: 'text-sm',
    marginBottom: '2',
  },
});

export const InputHelpTextTheme = defineStyleConfig({
  baseStyle: {
    color: 'var(--chakra-colors-gray-400) !important',
    fontWeight: 'regular',
    fontSize: 'text-sm',
    lineHeight: 'text-sm',
    mt: 'var(--chakra-space-1-5) !important',
  },
});

export const InputErrorTextTheme = defineStyleConfig({
  baseStyle: {
    ...InputHelpTextTheme.baseStyle,
    color: 'red.500',
  },
});
