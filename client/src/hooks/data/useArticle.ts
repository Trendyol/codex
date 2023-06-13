import useSWR from 'swr';
import { Article } from './models/types';

export const useArticle = (id: string) => {
  let key = `/publication/articles/${id}`;
  const { data, error, isLoading, mutate } = useSWR<Article>(key);

  return {
    error,
    isLoading,
    article: data,
    mutateArticles: mutate,
  };
};
