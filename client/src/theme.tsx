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
    body: {},
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  colors: {
    black: '#1a1a1b',
    white: '#ffffff',
    mainOrange: '#ff4500',
    mainBlue: '#0079d3',
    upvoteOrange: '#cc3700',
    downvoteBlue: '#5a75cc',
    textMuted: '#a8aaab',

    // light
    lightText: '#222222',
    lightButtonBg: '#0079d3',
    lightBg: '#DAE0E6',
    lightNavBg: '#ffffff',
    lightInputBg: '#f6f7f8',
    lightIcon: '#878a8c',

    // dark theme
    darkText: '#d7dadc',
    darkButtonBg: '#D7DADC',
    darkBg: '#030303',
    darkNavBg: '#1A1A1B',
    darkInputBg: '#272729',
    darkIcon: '#818384',
  },
  fonts: {
    body: 'IBM Plex Sans, sans-serif',
  },
  breakpoints,
});

export default theme;
