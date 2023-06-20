import useSWR from 'swr';
import { Article } from './models/types';

export const useArticleById = (id: string, isReady: boolean) => {
  let key = `/publication/articles/${id}`;
  const { data, error, isLoading, mutate } = useSWR<Article>(isReady ? key : undefined);

  return {
    error,
    isLoading,
    article: data,
    mutateArticle: mutate,
  };
};
