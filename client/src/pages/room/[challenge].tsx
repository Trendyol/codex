import Head from 'next/head';
import Room from '@modules/Room';

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

export default RoomPage;
