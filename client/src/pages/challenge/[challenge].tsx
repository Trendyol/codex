import Head from 'next/head';
import Challenge from '@modules/Challenge';
import { GetServerSideProps } from 'next';
import { getMe } from '@services/me';

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

export default ChallengePage;
