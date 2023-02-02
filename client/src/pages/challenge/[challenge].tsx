import Head from 'next/head';
import Lobby from '@modules/Lobby';
import Challenge from '@modules/Challenge';

const ChallengePage = () => {
  return (
    <>
      <Head>
        <title>Codex | Challenge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Challenge />
    </>
  );
};

export default ChallengePage;
