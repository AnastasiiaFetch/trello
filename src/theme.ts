import { extendTheme } from '@chakra-ui/react';
import { ButtonTheme, IconButtonTheme } from './elements/button/ButtonTheme';
import color from 'color';

const componentsThemes = {
  Button: ButtonTheme,
  IconButton: IconButtonTheme,
  // Input: InputTheme,
  // FormLabel: FormLabelTheme,
  // FormHelperText: FormHelpTextTheme,
  // FormErrorMessage: FormErrorTextTheme,
  // Textarea: TextAreaTheme,
  // Switch: SwitchTheme,
  // Menu: MenuTheme,
  // Link: LinkTheme,
  // Container: containerTheme,
  // PinInput: PinInputTheme,
  // Avatar: AvatarTheme,
  // Breadcrumb: BreadcrumbTheme,
  // Tabs: TabsTheme,
  // Radio: RadioTheme,
  // Tag: TagTheme,
  // Checkbox: CheckboxTheme,
  // Popover: PopoverTheme,

  // Select: SelectTheme,
};

const darkColor = color('#172b4d').lightness(10).alpha(0.8).rgb().string();
const lightColor = color('#FAFAFA').lightness(100).alpha(0.8).rgb().string();

const theme = extendTheme({
  fonts: {
    body: `Inter, Avenir, Helvetica, Arial, sans-serif`,
  },
  colors: {
    main: {
      light: lightColor,
      dark: darkColor,
    },
    red: {
      light: '#FEF3F2',
      medium: '#FDA29B',
      strong: '#F04438',
    },
    green: {
      light: '#ECFDF3',
      strong: '#12B76A',
    },
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
  components: componentsThemes,
});

export default theme;
