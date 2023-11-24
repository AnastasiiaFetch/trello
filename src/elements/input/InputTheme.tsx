import { createMultiStyleConfigHelpers, defineStyle, defineStyleConfig } from '@chakra-ui/react';

import { inputAnatomy } from '@chakra-ui/anatomy';
import { useMainColor } from '../../composable/useMainColor';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

const baseStyle = definePartsStyle({
  field: {
    width: '100%',
    outline: 'none',
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

export const FormLabelTheme = defineStyleConfig({
  baseStyle: {
    color: 'gray.700',
    fontWeight: 'semibold',
    fontSize: 'text-sm',
    lineHeight: 'text-sm',
    marginBottom: '1.5',
  },
});

export const FormHelpTextTheme = defineStyleConfig({
  baseStyle: {
    color: 'gray.600',
    fontWeight: 'regular',
    fontSize: 'text-sm',
    lineHeight: 'text-sm',
    mt: 'var(--chakra-space-1-5) !important',
  },
});

export const FormErrorTextTheme = defineStyleConfig({
  baseStyle: {
    ...FormHelpTextTheme.baseStyle,
    color: 'error.500',
  },
});

const baseStylePin = defineStyle({
  ...baseStyle.field,
  color: 'primary.600',
});
const variantDefaultPin = defineStyle(() => {
  const defaultVariant = variantDefault();
  return {
    ...defaultVariant.field,
    color: 'primary.600',
    _focusVisible: {
      color: 'primary.600',
      borderColor: 'primary.300',
      boxShadow: 'xs-primary-focus',
    },

    height: undefined,
  };
});

const smPin = defineStyle({
  fontSize: 'display-md',
  lineHeight: 'display-md',
  px: '2',
  py: '0.5',
  fontWeight: 'medium',
  borderRadius: '0.5rem',
  w: 'var(--chakra-sizes-16)',
  h: 'var(--chakra-sizes-16)',
});
const mdPin = defineStyle({
  fontSize: 'display-lg',
  lineHeight: 'display-lg',
  px: '2',
  py: '2.5',
  fontWeight: 'medium',
  w: 'var(--chakra-sizes-20)',
  h: 'var(--chakra-sizes-20)',
});
const lgPin = defineStyle({
  fontSize: 'display-xl',
  lineHeight: 'display-xl',
  px: '2',
  py: '3',
  fontWeight: 'medium',
  w: 'var(--chakra-sizes-24)',
  h: 'var(--chakra-sizes-24)',
});
export const PinInputTheme = defineStyleConfig({
  baseStyle: baseStylePin,
  sizes: { sm: smPin, md: mdPin, lg: lgPin },
  variants: { default: variantDefaultPin },
  defaultProps: {
    variant: 'default',
    size: 'sm',
  },
});
