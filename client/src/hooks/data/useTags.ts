import useSWR from 'swr';
import { Tag } from './models/types';

type useTagParams = {
  forArticle?: boolean;
  forProblem?: boolean;
};

export const useTags = ({ forArticle, forProblem }: useTagParams) => {
  const searchParams = new URLSearchParams('');
  if (forArticle) searchParams.append('forArticle', 'true');
  if (forProblem) searchParams.append('forProblem', 'true');

  const key = '/tag?' + searchParams.toString();
  const { data, error, isLoading, mutate } = useSWR<Tag[]>(key);

  return {
    error,
    isLoading,
    tags: data,
    mutateTags: mutate,
  };
};
