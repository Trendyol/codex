import useSWR from 'swr';
import { Problem } from './models/types';

export const useProblems = () => {
  const { data, error, isLoading, mutate } = useSWR<Problem[]>('/problem');

  return {
    error,
    isLoading,
    problems: data,
    mutateProblems: mutate,
  };
};
