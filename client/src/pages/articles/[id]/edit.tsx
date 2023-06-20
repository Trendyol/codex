import ArticleEditor from '@modules/Articles/editor';
import { getMe } from '@services/me';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const EditArticlePage = () => {
  return (
    <>
      <Head>
        <title>Codex | Edit Article</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ArticleEditor edit />
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

export default EditArticlePage;
