import useSWR from 'swr';
import { Challenge } from './models/types';

export const useChallenge = (id: string, isReady = true) => {
  const { data, error, isLoading, mutate } = useSWR<Challenge>(isReady ? `/challenge/${id}` : null);

  return {
    error,
    isLoading,
    challenge: data,
    mutateChallenge: mutate,
  };
};
