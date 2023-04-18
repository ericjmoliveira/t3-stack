import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';
import '~/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default api.withTRPC(App);
