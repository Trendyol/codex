import Head from 'next/head';
import Dashboard from '@modules/Dashboard';

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

export async function getServerSideProps(){
    return { props: {} };
}
export default DashboardPage;
