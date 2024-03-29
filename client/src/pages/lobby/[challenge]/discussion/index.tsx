import Head from 'next/head';
import Lobby from '@modules/Lobby';
import { GetServerSideProps } from 'next';
import { getMe } from '@services/me';

const LobbyPage = () => {
  return (
    <>
      <Head>
        <title>Codex | Discussion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Lobby discussion />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const me = await getMe(req.headers.cookie);

  if (!me) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      fallback: {
        '/user/me': me,
      },
    },
  };
};

export default LobbyPage;
