import useSWR from 'swr';
import { Article } from './models/types';

export const useArticles = (isDraft :boolean) => {
  let key = '/publication/articles';
  if (isDraft) {
    key = '/publication/articles/drafts';
  }
  const { data, error, isLoading, mutate } = useSWR<Article[]>(key);

  return {
    error,
    isLoading,
    articles: data,
    mutateArticles: mutate,
  };
};
