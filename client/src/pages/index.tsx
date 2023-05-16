import Head from 'next/head';
import Dashboard from '@modules/Dashboard';
import { GetServerSideProps } from 'next';
import { getMe } from '@services/me';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Codex | Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
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

export default DashboardPage;
