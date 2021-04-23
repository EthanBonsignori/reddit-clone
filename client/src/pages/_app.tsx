import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import '@fontsource/ibm-plex-sans';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/noto-sans';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import theme from '../theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default App;
