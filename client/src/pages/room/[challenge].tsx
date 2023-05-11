import Head from 'next/head';
import Room from '@modules/Room';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import DefaultLayout from '@components/Layout/Default';

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

export async function getServerSideProps(){
    return { props: {} };
}

export default RoomPage;
