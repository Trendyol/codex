import useSWR from 'swr';
import { Submission } from './models/types';

export const useSubmissions = (problemId: string, teamId?: string) => {
  let key = `/submission?problemId=${problemId}`;
  if (teamId) key += `&teamId=${teamId}`;

  const { data, error, isLoading, mutate } = useSWR<Submission[]>(key);

  return {
    error,
    isLoading,
    submissions: data,
    mutateSubmissions: mutate,
  };
};
