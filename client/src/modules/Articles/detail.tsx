import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import Spinner from '@components/shared/Spinner';
import Suggestion from '@components/shared/Suggestion';
import Card from '@components/ui/Card';
import { useArticleById } from '@hooks/data/useArticleById';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';

const ArticleDetail = () => {
  const router = useRouter();
  const { article } = useArticleById(router.query.id as string);

  if (!article) return <Spinner />;

  const formattedDate = DateTime.fromISO(article.createdAt).toFormat('dd LLL yyyy - HH:mm');
  return (
    <>
      <div className="flex flex-1 gap-6">
        <Card className="mb-6 flex flex-col gap-6 overflow-x-auto rounded-lg">
          {JSON.stringify(article?.createdAt)}
          <div className="text-xl font-semibold text-primary-400">{article?.title}</div>
          <div className="whitespace-break-spaces text-primary-400">{article?.content}</div>
          <div>{article?.author?.name}</div>
          <div>{formattedDate}</div>
        </Card>

        <div className="flex w-sidebar flex-shrink-0 flex-col gap-6 xl:w-[270px] md:hidden">
          <Progression />
          <Leaderboard />
          <Community />
          <Suggestion />
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
