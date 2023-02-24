import useSWR from 'swr';
import { User } from './models/types';

export const useUser = (id: string, isReady = true) => {
  const { data, error, isLoading, mutate } = useSWR<User>(isReady ? `/user/${id}` : null);

  return {
    error,
    isLoading,
    user: data,
    mutateUser: mutate,
  };
};
