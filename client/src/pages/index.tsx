import Head from 'next/head';
import Home from '@modules/Home';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Codex | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </>
  );
};

export default HomePage;
