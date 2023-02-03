import useSWR from 'swr';
import { User } from './models/types';

export const useUser = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<User>(`/user/${id}`);

  return {
    error,
    isLoading,
    user: data,
    mutateUser: mutate,
  };
};
