import useSWR from 'swr';
import { Challenge } from './models/types';

export const useChallenge = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<Challenge>(`/challenge/${id}`);

  return {
    error,
    isLoading,
    challenge: data,
    mutateChallenge: mutate,
  };
};
