import React, { ReactElement } from 'react';
import Head from 'next/head';
import Login from '@modules/Auth/Login';
import DefaultLayout from '@components/Layout/Default';
import { AppProps } from 'next/app';

export const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Codex | Room</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
};

LoginPage.getLayout = function getLayout(pageProps: AppProps, page: ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>
};

export async function getServerSideProps(){
    return { props: {} };
}

export default LoginPage;
