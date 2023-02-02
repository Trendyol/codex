import useSWR from 'swr';
import { Challenge } from './models/types';

export const useChallenges = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<Challenge>(`/challenge/${id}`);

  return {
    error,
    isLoading,
    challenges: data,
    mutateChallenge: mutate,
  };
};
