import Head from 'next/head';
import Problem from '@modules/Problem';
import DefaultLayout from '@components/Layout/Default';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';

const ProblemPage = () => {
  return (
    <>
      <Head>
        <title>Codex | Problem</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Problem />
    </>
  );
};

ProblemPage.getLayout = function getLayout(pageProps: AppProps, page: ReactElement) {
  return (
    <DefaultLayout showHeader showSidebar collapsed>
      {page}
    </DefaultLayout>
  );
};

export default ProblemPage;
