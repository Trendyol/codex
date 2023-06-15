import Card from '@components/ui/Card';
import { FC } from 'react';
import { BsFillEnvelopePaperFill } from 'react-icons/bs';
import Link from 'next/link';
import { Article } from '@hooks/data/models/types';
import Button from '@components/ui/Button';
import { DateTime } from 'luxon';

type ArticleProps = {} & Article;

const ArticleListing: FC<ArticleProps> = (article: Article) => {
  const { title, createdAt, author, isPublished } = article;

  const formattedDate = DateTime.fromISO(article.createdAt).toFormat('dd LLL yyyy');

  function markdownToPlainText(markdownText: string) {
    let plainText = markdownText;

    // Headers
    plainText = plainText.replace(/^#+\s+/gm, '');

    // Emphasis
    plainText = plainText.replace(/(\*|_){1,3}(.*?)\1{1,3}/g, '$2');

    // Lists
    plainText = plainText.replace(/^(\s*[-*]|\d+\.)\s+/gm, '');

    // Blockquotes
    plainText = plainText.replace(/^\s*>/gm, '');

    // Code
    plainText = plainText.replace(/`{1,3}(.*?)`{1,3}/g, '$1');

    // Links and Images
    plainText = plainText.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

    // Horizontal Rule
    plainText = plainText.replace(/^\s*([-*_]){3,}\s*$/gm, '');

    return plainText.trim();
  }

  return (
    <Link href={`/articles/${article.id}`}>
      <Card className="min-w-[260px]">
        <div className="flex justify-between">
          <div>
            <div className="text-xl font-semibold text-primary-400">{article.title}</div>
            <div className="mb-4 text-sm font-medium capitalize text-secondary-200 opacity-70 lg:text-sm">
              {author?.name} - {formattedDate}
            </div>
          </div>

          <Button intent={'primary'} size={'small'}>
            Read &nbsp; &gt;
          </Button>
        </div>

        <div className="flex">
          <div className="mr-6 flex h-12 w-12 items-center justify-center rounded-md bg-[#9694ff] lg:hidden">
            <BsFillEnvelopePaperFill color="white" />
          </div>
          <div className="flex flex-1 flex-col ">
            <div className="mb-1 line-clamp-3 h-[72px] text-ellipsis whitespace-pre-wrap text-secondary-200">
              {markdownToPlainText(article.content)}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleListing;
