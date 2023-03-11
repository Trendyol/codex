import Search from '@modules/Search';
import Head from 'next/head';

const SearchPage = () => {
  return (
    <>
      <Head>
        <title>Codex | Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
    </>
  );
};

export default SearchPage;
