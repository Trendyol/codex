import React from 'react';
import Head from 'next/head';
import User from '@modules/User';

export const UserPage = () => {
  return (
    <>
      <Head>
        <title>Codex | User</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <User />
    </>
  );
};

export default UserPage;
