import useSWR from 'swr';
import { Article } from './models/types';

export const useArticles = () => {
  let key = '/publication/articles';
  const { data, error, isLoading, mutate } = useSWR<Article[]>(key);

  return {
    error,
    isLoading,
    articles: data,
    mutateArticles: mutate,
  };
};
