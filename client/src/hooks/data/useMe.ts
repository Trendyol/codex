import useSWR from 'swr';
import { User } from './models/types';

export const useMe = () => {
  const { data, error, isLoading, mutate } = useSWR<User>(`/user/me`);

  return {
    error,
    isLoading,
    me: data,
    mutateMe: mutate,
  };
};
