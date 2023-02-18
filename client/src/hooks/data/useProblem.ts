import useSWR from 'swr';
import { Problem } from './models/types';

export const useProblem = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<Problem>(`/problem/${id}`);

  return {
    error,
    isLoading,
    problem: data,
    mutateProblem: mutate,
  };
};
