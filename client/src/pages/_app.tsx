import '@styles/globals.css';
import { fetcher } from '@utils/fetcher';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { Inter } from '@next/font/google';
import { LAYOUT_EXCLUDED_PAGES } from '@models/constants';
import { useRouter } from 'next/router';
import RawLayout from '@components/layout/Raw';
import DefaultLayout from '@components/layout/Default';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (pageProps: AppProps, page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  if (Component.getLayout) {
    return Component.getLayout(pageProps, <Component {...pageProps} />);
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <DefaultLayout showHeader showSidebar>
        <Component {...pageProps} />
      </DefaultLayout>
    </SWRConfig>
  );
};

export default App;
