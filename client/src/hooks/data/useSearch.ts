import useSWR from 'swr';
import { User } from './models/types';

export const useSearch = (search: string) => {
  const { data, error, isLoading, mutate } = useSWR(search ? `/user/search/${search}` : null);

  return {
    error,
    isLoading,
    users: (data as User[]) ? data : [],
    mutateUsers: mutate,
  };
};