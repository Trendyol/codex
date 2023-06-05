import useSWR from 'swr';
import { Placement } from './models/types';

export const usePlacements = (challengeId: string, isReady = false) => {
  const { data, error, isLoading, mutate } = useSWR<Placement[]>(
    isReady ? `/challenge/${challengeId}/placements` : null,
    {
      refreshInterval: 30000,
    },
  );

  return {
    error,
    isLoading,
    placements: data,
    mutatePlacements: mutate,
  };
};
