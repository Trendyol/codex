import Head from 'next/head';
import Practice from '@modules/Practice';
import { GetServerSideProps } from 'next';
import { getMe } from '@services/me';

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

export default PracticePage;
