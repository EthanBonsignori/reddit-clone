import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import '@fontsource/ibm-plex-sans';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/noto-sans';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import theme from '../theme';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  cache: new InMemoryCache(),
  credentials: 'include',
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
