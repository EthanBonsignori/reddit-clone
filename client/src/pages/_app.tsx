import '@fontsource/ibm-plex-sans';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/noto-sans';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { Provider, createClient } from 'urql';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../theme';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
