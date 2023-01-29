import useSWR from 'swr';
import { Room } from './models/types';

export const useRoom = (challenge: string) => {
  const { data, error, isLoading, mutate } = useSWR<Room>(`/room/${challenge}`);

  return {
    error,
    isLoading,
    room: data,
    mutateRoom: mutate,
  };
};
