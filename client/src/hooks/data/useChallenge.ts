import useSWR from 'swr';
import { Challenge } from './models/types';

export const useChallenges = () => {
  const { data, error, isLoading, mutate } = useSWR<Challenge[]>('/challenge');

  return {
    error,
    isLoading,
    challenges: data,
    mutateChallenges: mutate,
  };
};
