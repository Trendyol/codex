import useSWR from 'swr';
import { Room } from './models/types';

export const useRoom = (challenge: string, isReady = true) => {
  const { data, error, isLoading, mutate } = useSWR<Room>(isReady ? `/room/${challenge}` : null);

  return {
    error,
    isLoading,
    room: data,
    mutateRoom: mutate,
  };
};
