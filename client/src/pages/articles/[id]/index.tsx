import ArticleDetail from '@modules/Articles/detail';
import { getMe } from '@services/me';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const ArticleEditorPage = () => {
  return (
    <>
      <Head>
        <title>Codex | Detail</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ArticleDetail />
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

export default ArticleEditorPage;
