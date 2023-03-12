import useSWR from 'swr';
import { Lobby } from './models/types';

export const useLobby = (challenge: string) => {
  const { data, error, isLoading, mutate } = useSWR<Lobby>(`/lobby/${challenge}`);

  return {
    error,
    isLoading,
    lobby: data,
    mutateLobby: mutate,
  };
};
