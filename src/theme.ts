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
import { SelectTheme } from './elements/select/SelectTheme';

const darkColor = color('#172b4d').lightness(10).alpha(0.8).rgb().string();
const lightColor = color('#FAFAFA').lightness(100).alpha(0.8).rgb().string();

const theme = extendTheme({
  fonts: {
    body: `Inter, Avenir, Helvetica, Arial, sans-serif`,
  },
  colors: {
    basic: '#EEEFFB',
    main: {
      light: lightColor,
      dark: darkColor,
    },
    modal: { background: '#FFFFFF', text: darkColor },
    list: { background: '#f1f2f4', text: darkColor, subtle: '#44546F', subtlest: '#626F86' },
  },
  fontSizes: {
    'text-xs': '0.8rem',
    'text-sm': '1rem',
    'text-md': '1.125rem',
    'text-lg': '1.25rem',
    'text-xl': '1.55rem',
    'display-xs': '1.85rem',
    'display-sm': '2rem',
    'display-md': '2.25rem',
    'display-lg': '3rem',
    'display-xl': '3.55rem',
    'display-2xl': '4rem',
  },
  lineHeights: {
    'text-xs': '1.25rem',
    'text-sm': '1.5rem',
    'text-md': '1.85rem',
    'text-lg': '1.875rem',
    'text-xl': '2rem',
    'display-xs': '2.275rem',
    'display-sm': '2.575rem',
    'display-md': '2.755rem',
    'display-lg': '3.575rem',
    'display-xl': '4.575rem',
    'display-2xl': '5.575rem',
  },
  textStyles: {
    'text-xs': {
      fontSize: '0.8rem',
      lineHeight: '1.125rem',
    },
    'text-sm': {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    'text-md': { fontSize: '1.125rem', lineHeight: '1.85rem' },
    'text-lg': { fontSize: '1.25rem', lineHeight: '1.875rem' },
    'text-xl': { fontSize: '1.55rem', lineHeight: '2rem' },
    'display-xs': { fontSize: '1.85rem', lineHeight: '2.275rem' },
    'display-sm': { fontSize: '2rem', lineHeight: '2.575rem' },
    'display-md': { fontSize: '2.25rem', lineHeight: '2.755rem', letterSpacing: '-0.05em' },
    'display-lg': { fontSize: '3rem', lineHeight: '3.575rem', letterSpacing: '-0.05em' },
    'display-xl': { fontSize: '3.55rem', lineHeight: '4.575rem', letterSpacing: '-0.05em' },
    'display-2xl': { fontSize: '4rem', lineHeight: '5.575rem', letterSpacing: '-0.05em' },
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
    Select: SelectTheme,
  },
});

export default theme;
