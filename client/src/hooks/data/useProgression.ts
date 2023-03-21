import useSWR from 'swr';
import { Progression } from './models/types';

export const useProgression = (isReady = true) => {
  const { data, error, isLoading, mutate } = useSWR<Progression>(
    isReady ? `/problem/progression/all` : null,
  );

  return {
    error,
    isLoading,
    progression: data,
    mutateProgression: mutate,
  };
};
