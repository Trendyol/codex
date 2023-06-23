import Card from '@components/ui/Card';
import { FC } from 'react';
import { BsFillEnvelopePaperFill } from 'react-icons/bs';
import Link from 'next/link';
import { Article } from '@hooks/data/models/types';
import Button from '@components/ui/Button';
import { DateTime } from 'luxon';
import { useMe } from '@hooks/data';
import ListingCard from '@components/shared/ListingCard';

type ArticleProps = {} & Article;

const ArticleListing: FC<ArticleProps> = (article: Article) => {
  const { title, createdAt, author, isPublished } = article;
  const { me } = useMe();

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

  const isAuthor = me?.id === author?.id;

  return (
    <ListingCard
      title={article.title}
      subtitle={`${author?.name} - ${formattedDate}`}
      action={
        <Button intent={'primary'} size={'small'}>
          {!isAuthor ? 'Read' : 'Edit'}
        </Button>
      }
      image={<BsFillEnvelopePaperFill size={24} color="white" />}
      content={markdownToPlainText(article.content)}
      href={`/articles/${article.id}/${isAuthor ? 'edit' : ''}`}
    />
  );
};

export default ArticleListing;
