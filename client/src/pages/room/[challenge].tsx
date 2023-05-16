import Head from 'next/head';
import Room from '@modules/Room';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import DefaultLayout from '@components/Layout/Default';
import { GetServerSideProps } from 'next';
import { getMe } from '@services/me';

const RoomPage = () => {
  return (
    <>
      <Head>
        <title>Codex | Room</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Room />
    </>
  );
};

RoomPage.getLayout = function getLayout(pageProps: AppProps, page: ReactElement) {
  return (
    <DefaultLayout showHeader showSidebar collapsed>
      {page}
    </DefaultLayout>
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

export default RoomPage;
