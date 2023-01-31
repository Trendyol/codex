import React from 'react';
import Head from 'next/head';
import Login from '@modules/Auth/Login';

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

export default LoginPage;
