import Head from 'next/head';
import Practice from '@modules/Practice';

const PracticePage = () => {
  return (
    <>
      <Head>
        <title>Codex | Practice</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Practice />
    </>
  );
};

export default PracticePage;
