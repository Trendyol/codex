import Leaderboard from '@modules/Leaderboard';
import Head from 'next/head';

const LeaderboardPage = () => {
  return (
    <>
      <Head>
        <title>Codex | Leaderboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Leaderboard />
    </>
  );
};

export default LeaderboardPage;
