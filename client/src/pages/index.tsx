import Head from 'next/head';
import Dashboard from '@modules/Dashboard';
import { GetServerSideProps } from 'next';
import { getMe } from '@services/me';
import { getChallenges } from '@services/challeges';
import Confetti from '@components/Confetti';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Codex | Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Confetti />
      <Dashboard />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const me = await getMe(req.headers.cookie);
  const challenges = await getChallenges(req.headers.cookie);

  return {
    props: {
      fallback: {
        '/user/me': me,
        '/challenge': challenges,
      },
    },
  };
};

export default DashboardPage;
