import '@styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import DefaultLayout from '@components/Layout/Default';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { fetcher } from '@utils/fetcher';
import ThemeProvider from '@contexts/ThemeContext';
import ConfigProvider from '@contexts/ConfigContext';

type NextPageWithLayout = NextPage & {
  getLayout?: (pageProps: AppProps, page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  if (Component.getLayout) {
    return (
      <SWRConfig value={{ fetcher, fallback: pageProps.fallback }}>
        <ThemeProvider>
          <ConfigProvider>
            {Component.getLayout(pageProps, <Component {...pageProps} />)}
            <ToastContainer autoClose={2000} />
          </ConfigProvider>
        </ThemeProvider>
      </SWRConfig>
    );
  }

  return (
    <SWRConfig value={{ fetcher, fallback: pageProps.fallback }}>
      <ThemeProvider>
        <ConfigProvider>
          <DefaultLayout showHeader showSidebar>
            <Component {...pageProps} />
            <ToastContainer autoClose={2000} />
          </DefaultLayout>
        </ConfigProvider>
      </ThemeProvider>
    </SWRConfig>
  );
};

export default App;
