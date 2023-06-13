import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import Suggestion from '@components/shared/Suggestion';
import Card from '@components/ui/Card';
import ArticleListing from './ArticleListing';
import Button from '@components/ui/Button';
import Link from 'next/link';
import { useArticles } from '@hooks/data/useArticles';

const Articles = () => {
  const { articles } = useArticles();

  return (
    <>
      <div className="flex flex-1 gap-6">
        <div className="flex-1">
          <Card className="mb-6 flex h-fit items-center justify-between overflow-x-auto rounded-lg">
            <div className="text-xl font-semibold text-primary-400">Articles</div>
            <Link href="/articles/create">
              <Button intent={'secondary'} fluid>
                Create New Article
              </Button>
            </Link>
          </Card>

          <div className="flex flex-1 flex-col gap-6">
            {articles &&
              articles.map((article) => <ArticleListing key={article.title} {...article} />)}
          </div>
        </div>

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

export default Articles;
