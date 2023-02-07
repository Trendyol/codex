import Head from 'next/head';
import Room from '@modules/Room';
import { SWRConfig } from 'swr';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import DefaultLayout from '@components/layout/Default';
import { fetcher } from '@utils/fetcher';

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
    <SWRConfig value={{ fetcher }}>
      <DefaultLayout showHeader showSidebar collapsed>{page}</DefaultLayout>
    </SWRConfig>
  );
};

export default RoomPage;
