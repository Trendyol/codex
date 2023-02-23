import '@styles/globals.css';
import { fetcher } from '@utils/fetcher';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import DefaultLayout from '@components/layout/Default';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

type NextPageWithLayout = NextPage & {
  getLayout?: (pageProps: AppProps, page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  if (Component.getLayout) {
    return (
      <SWRConfig value={{ fetcher }}>
        {Component.getLayout(pageProps, <Component {...pageProps} />)}
        <ToastContainer autoClose={2000} />
      </SWRConfig>
    );
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <DefaultLayout showHeader showSidebar>
        <Component {...pageProps} />
        <ToastContainer autoClose={2000} />
      </DefaultLayout>
    </SWRConfig>
  );
};

export default App;
