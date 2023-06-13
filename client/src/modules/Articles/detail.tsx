import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import Suggestion from '@components/shared/Suggestion';
import { useArticle } from '@hooks/data/useArticle';
import { Card } from 'flowbite-react';
import { useRouter } from 'next/router';

const ArticleDetail = () => {
  const router = useRouter();
  const { article } = useArticle(router.query.id as string);

  return (
    <>
      <div className="flex flex-1 gap-6">
        <Card className="mb-6 flex h-fit flex-1 overflow-x-auto rounded-lg">
          <div className="text-xl font-semibold text-primary-400">{article?.title}</div>
          <div className="whitespace-break-spaces text-primary-400">{article?.content}</div>
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
