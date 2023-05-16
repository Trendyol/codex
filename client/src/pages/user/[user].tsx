import React from 'react';
import Head from 'next/head';
import User from '@modules/User';
import { GetServerSideProps } from 'next';
import { getMe } from '@services/me';

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const me = await getMe(req.headers.cookie);
  return {
    props: {
      fallback: {
        '/user/me': me,
      },
    },
  };
};

export default UserPage;
