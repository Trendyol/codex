import useSWR from 'swr';
import { Order, User } from './models/types';

export const useUsers = ({orderBy, order, limit}: Order) => {
  let key = '/user'
  if (orderBy) {
    key += `?orderBy=${orderBy}&order=${order}`
  }
  if (limit) {
    key += `&limit=${limit}`
  }
  const { data, error, isLoading, mutate } = useSWR<User[]>(key);

  return {
    error,
    isLoading,
    users: data,
    mutateUsers: mutate,
  };
};
