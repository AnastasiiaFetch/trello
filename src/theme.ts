import { extendTheme } from '@chakra-ui/react';
import color from 'color';

import { ButtonTheme, IconButtonTheme } from './elements/button/ButtonTheme';
import {
  InputErrorTextTheme,
  InputHelpTextTheme,
  InputLabelTheme,
  InputTheme,
} from './elements/input/InputTheme';
import { AvatarTheme } from './elements/avatar/AvatarTheme';

const darkColor = color('#172b4d').lightness(10).alpha(0.8).rgb().string();
const lightColor = color('#FAFAFA').lightness(100).alpha(0.8).rgb().string();

const theme = extendTheme({
  fonts: {
    body: `Inter, Avenir, Helvetica, Arial, sans-serif`,
  },
  colors: {
    basic: '#eff5fa',
    main: {
      light: lightColor,
      dark: darkColor,
    },
    list: { background: '#f1f2f4', text: darkColor, subtle: '#44546F', subtlest: '#626F86' },
  },
  fontSizes: {
    'text-xs': '0.75rem',
    'text-sm': '0.875rem',
    'text-md': '1rem',
    'text-lg': '1.125rem',
    'text-xl': '1.25rem',
    'display-xs': '1.5rem',
    'display-sm': '1.875rem',
    'display-md': '2.25rem',
    'display-lg': '3rem',
    'display-xl': '3.75rem',
    'display-2xl': '4.5rem',
  },
  lineHeights: {
    'text-xs': '1.125rem',
    'text-sm': '1.25rem',
    'text-md': '1.5rem',
    'text-lg': '1.75rem',
    'text-xl': '1.875rem',
    'display-xs': '2rem',
    'display-sm': '2.375rem',
    'display-md': '2.75rem',
    'display-lg': '3.75rem',
    'display-xl': '4.5rem',
    'display-2xl': '5.625rem',
  },
  textStyles: {
    'text-xs': {
      fontSize: '0.75rem',
      lineHeight: '1.125rem',
    },
    'text-sm': {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
    'text-md': { fontSize: '1rem', lineHeight: '1.5rem' },
    'text-lg': { fontSize: '1.125rem', lineHeight: '1.75rem' },
    'text-xl': { fontSize: '1.25rem', lineHeight: '1.875rem' },
    'display-xs': { fontSize: '1.5rem', lineHeight: '2rem' },
    'display-sm': { fontSize: '1.875rem', lineHeight: '2.375rem' },
    'display-md': { fontSize: '2.25rem', lineHeight: '2.75rem', letterSpacing: '-0.02em' },
    'display-lg': { fontSize: '3rem', lineHeight: '3.75rem', letterSpacing: '-0.02em' },
    'display-xl': { fontSize: '3.75rem', lineHeight: '4.5rem', letterSpacing: '-0.02em' },
    'display-2xl': { fontSize: '4.5rem', lineHeight: '5.625rem', letterSpacing: '-0.02em' },
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  components: {
    Button: ButtonTheme,
    IconButton: IconButtonTheme,
    Input: InputTheme,
    FormLabel: InputLabelTheme,
    FormHelperText: InputHelpTextTheme,
    FormErrorMessage: InputErrorTextTheme,
    Avatar: AvatarTheme,
  },
});

export default theme;
