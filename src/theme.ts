import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: `Inter, Avenir, Helvetica, Arial, sans-serif`
  },
  colors: {
    main: {
      white: '#FFFFFF',
      black: '#000000'
    },
    brown: {
      almond: '#EADDCA',
      buff: '#DAA06D',
      camel: '#C19A6B',
      nude: '#F2D2BD',
      tan: '#D2B48C',
      wheat: '#F5DEB3',
      wine: '#722F37'
    },
    gray: {
      darkGray: '#A9A9A9',
      gray: '#808080',
      lightGray: '#D3D3D3',
      platinum: '#E5E4E2',
      slateGray: '#708090',
      steelGray: '#71797E'
    },
    red: {
      light: '#FEF3F2',
      medium: '#FDA29B',
      strong: '#F04438'
    },
    green: {
      light: '#ECFDF3',
      strong: '#12B76A'
    }
  },
  fontSizes: {
    'text-xs': '0.75rem',
    'text-sm': '1rem',
    'text-md': '1.125rem',
    'text-lg': '1.5rem',
    'text-xl': '2.25rem'
  },
  lineHeights: {
    'text-xs': '1rem',
    'text-sm': '1.25rem',
    'text-md': '1.5rem'
  },
  textStyles: {
    'text-xs': {
      fontSize: '0.75rem',
      lineHeight: '1.125rem'
    },
    'text-sm': {
      fontSize: '1rem',
      lineHeight: '1.25rem'
    },
    'text-md': { fontSize: '1.125rem', lineHeight: '1.25rem' },
    'text-lg': { fontSize: '1.5rem', lineHeight: '2rem' },
    'text-xl': { fontSize: '2.25rem', lineHeight: '2.75rem' }
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
});

export default theme;
