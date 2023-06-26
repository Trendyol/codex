import useSWR from 'swr';
import { Problem } from './models/types';

export const useProblems = (tags: string[]) => {
  const searchParams = new URLSearchParams('');
  if (tags) searchParams.append('tags', tags.map((tag) => tag).join(','));

  const key = '/problem?' + searchParams.toString();
  const { data, error, isLoading, mutate } = useSWR<Problem[]>(key);

  return {
    error,
    isLoading,
    problems: data,
    mutateProblems: mutate,
  };
};
