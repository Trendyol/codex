import useSWR from 'swr';
import { Problem } from './models/types';

export const useProblem = (id: string, isReady = true) => {
  const { data, error, isLoading, mutate } = useSWR<Problem>(isReady ? `/problem/${id}` : null);

  return {
    error,
    isLoading,
    problem: data,
    mutateProblem: mutate,
  };
};
