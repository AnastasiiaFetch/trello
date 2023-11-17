import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import useMainColorStore from '../../store/colorState';
import { useMainColor } from '../../utils/useMainColor';

const sm = defineStyle({
  fontSize: 'text-sm',
  fontWeight: 'semibold',
  px: '4',
  py: '2',
  borderRadius: '8px',
});
const md = defineStyle({
  ...sm,
  px: '4',
  py: '2.5',
});

const lg = defineStyle({
  ...md,
  fontSize: 'text-md',
  px: '4.5',
  py: '2.5',
});

const primaryVariant = defineStyle(() => {
  const mainColor = useMainColorStore(state => state.color);
  const { textColor } = useMainColor(mainColor);

  return {
    border: '1px solid transparent',
    outline: 'none',
    bg: 'gray.200',
    color: textColor,
    boxShadow: 'xs',
    _hover: {
      borderColor: 'gray.300',
      _disabled: {
        bg: 'initial',
      },
    },
    _disabled: {
      bg: 'gray.100',
    },
  };
});

const secondaryVariant = defineStyle(() => {
  const mainColor = useMainColorStore(state => state.color);
  const { textColor, lightBg } = useMainColor(mainColor);

  return {
    w: '100%',
    justifyContent: 'start',
    border: '1px solid transparent',
    outline: 'none',
    color: textColor,
    borderRadius: 'none',
    bg: 'transparent',
    _hover: {
      bg: lightBg,
      color: textColor,
      _disabled: {
        bg: 'initial',
      },
    },
    _disabled: {
      bg: 'gray.200',
      color: 'gray.400',
    },
  };
});

const baseStyle = defineStyle(props => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: props.fullWidth ? '100%' : 'auto',
  };
});

export const ButtonTheme = defineStyleConfig({
  baseStyle,
  sizes: { sm, md, lg },
  variants: {
    primary: primaryVariant,
    secondary: secondaryVariant,
  },
  defaultProps: {
    variant: 'primary',
  },
});

const iconSm = defineStyle({
  px: 'var(--chakra-space-1-5) !important',
  py: 'var(--chakra-space-1-5) !important',
  borderRadius: '8px',
});
const iconMd = defineStyle({
  ...iconSm,
  px: 'var(--chakra-space-2) !important',
  py: 'var(--chakra-space-2) !important',
});

const iconLg = defineStyle({
  ...iconMd,
  fontSize: 'text-md',
  px: 'var(--chakra-space-2-5) !important',
  py: 'var(--chakra-space-2-5) !important',
});

const primaryIconVariant = defineStyle(() => {
  const mainColor = useMainColorStore(state => state.color);
  const { textColor, colorWithNoOpacity } = useMainColor(mainColor);

  return {
    border: '1px solid',
    borderColor: textColor,
    outline: 'none',
    bg: colorWithNoOpacity,
    color: textColor,
    borderRadius: 'xl',
    boxShadow: 'xs',
    _hover: {
      borderColor: 'inherit',
      _disabled: {
        cursor: 'not-allowed',
        bg: 'gray.200',
        borderColor: 'inherit',
      },
    },
    _disabled: {
      opacity: '0.6',
      bg: 'gray.200',
    },
  };
});

const secondaryIconVariant = defineStyle(() => {
  const mainColor = useMainColorStore(state => state.color);
  const { textColor } = useMainColor(mainColor);

  return {
    border: '1px solid transparent',
    outline: 'none',
    color: textColor,
    bg: 'transparent',
    _hover: {
      _disabled: {
        borderColor: 'transparent',
        bg: 'gray.200',
      },
    },
    _disabled: {
      bg: 'gray.200',
      color: 'gray.400',
    },
  };
});

export const IconButtonTheme = defineStyleConfig({
  baseStyle: {
    dislay: 'flex',
    cursor: 'pointer',
  },

  sizes: { sm: iconSm, md: iconMd, lg: iconLg },
  variants: {
    primary: primaryIconVariant,
    secondary: secondaryIconVariant,
  },
});
