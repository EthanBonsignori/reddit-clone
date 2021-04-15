import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  global: {
    body: {

    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  colors: {
    black: '#1a1a1b',
    white: '#ffffff',
    mainOrange: '#ff4500',

    // light
    lightText: '#222222',
    lightButton: '#0079d3',
    lightBg: '#DAE0E6',
    lightNavBg: '#ffffff',
    lightInputBg: '#f6f7f8',

    // dark theme
    darkText: '#d7dadc',
    darkButton: '#D7DADC',
    darkBg: '#030303',
    darkNavBg: '#1A1A1B',
    darkInputBg: '#272729',
  },
  fonts: {
    body: 'ibm-plex-sans, sans-serif',
  },
  breakpoints,
  icons: {
    logo: {
      path: (
        'placeholder'
      ),
      viewBox: '',
    },
  },
});

export default theme;
