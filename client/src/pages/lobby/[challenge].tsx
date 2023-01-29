import Head from 'next/head';
import Home from '@modules/Home';
import Lobby from '@modules/Lobby';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Codex | Lobby</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Lobby />
    </>
  );
};

export default HomePage;
