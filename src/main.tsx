import ReactDOM from 'react-dom/client';
import theme from './theme';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import Fonts from './assets/fonts/Fonts.tsx';
import Router from './router.tsx';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <HelmetProvider>
        <Fonts />
        <Router />
      </HelmetProvider>
    </ChakraProvider>
  </QueryClientProvider>
);
