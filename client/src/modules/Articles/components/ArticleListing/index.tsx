import Card from '@components/ui/Card';
import { FC } from 'react';
import { BsFillEnvelopePaperFill } from 'react-icons/bs';
import Link from 'next/link';
import { Article } from '@hooks/data/models/types';
import Button from '@components/ui/Button';
import { DateTime } from 'luxon';

type ArticleProps = {} & Article;

const ArticleListing: FC<ArticleProps> = (article: Article) => {
  const { title, createdAt, author } = article;

  const formattedDate = DateTime.fromISO(article.createdAt).toFormat('dd LLL yyyy');

  return (
    <Link href={`/articles/${article.id}`}>
      <Card className="min-w-[260px]">
        <div className="mb-4 text-xl font-semibold text-primary-400">{article.title}</div>
        <div className="flex">
          <div className="mr-6 flex h-12 w-12 items-center justify-center rounded-md bg-[#9694ff] lg:hidden">
            <BsFillEnvelopePaperFill color="white" />
          </div>
          <div className="flex flex-1 flex-col ">
            <div className="mb-1 line-clamp-3 h-[72px] text-ellipsis whitespace-pre-wrap text-secondary-200">
              {article.content}
            </div>
            <div>{formattedDate}</div>
            <div className="mt-2 flex items-center justify-between font-semibold text-secondary-200 lg:text-sm">
              <div className="text-sm capitalize">date</div>
              <div className="text-sm capitalize">{author?.name}</div>
              <Button intent={'primary'} size={'small'}>
                Read
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleListing;
