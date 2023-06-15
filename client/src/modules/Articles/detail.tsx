import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import Spinner from '@components/shared/Spinner';
import Suggestion from '@components/shared/Suggestion';
import Card from '@components/ui/Card';
import { useArticleById } from '@hooks/data/useArticleById';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const ArticleDetail = () => {
  const router = useRouter();
  const { article } = useArticleById(router.query.id as string);

  if (!article) return <Spinner />;

  const formattedDate = DateTime.fromISO(article.createdAt).toFormat('dd LLL yyyy - HH:mm');
  return (
    <>
      <div className="flex flex-1 gap-6">
        <Card className="mb-6 flex h-full flex-col gap-6 overflow-x-auto rounded-lg">
          <div className="prose">
            <h1 className="mb-0">{article.title}</h1>
            <p className="mt-1 text-sm font-medium capitalize text-secondary-200 opacity-70 lg:text-sm">
              {article.author.name} &nbsp; | &nbsp; {formattedDate}
            </p>
          </div>

          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            className="prose pt-2 text-secondary-200 prose-headings:text-secondary-200"
          >
            {article.content}
          </ReactMarkdown>
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
