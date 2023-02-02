import '@styles/globals.css';
import { fetcher } from '@utils/fetcher';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { Inter } from '@next/font/google';
import { LAYOUT_EXCLUDED_PAGES } from '@models/constants';
import { useRouter } from 'next/router';
import AuthLayout from '@components/layout/Auth';
import DefaultLayout from '@components/layout/Default';

const inter = Inter({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  if (LAYOUT_EXCLUDED_PAGES.includes(router.route)) {
    return (
      <>
        <SWRConfig value={{ fetcher }}>
          <div className={inter.className}>
            <AuthLayout>
              <Component {...pageProps} />
            </AuthLayout>
          </div>
        </SWRConfig>
      </>
    );
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <div className={inter.className}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </div>
    </SWRConfig>
  );
};

export default App;
