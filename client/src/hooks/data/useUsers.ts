import useSWR from 'swr';
import { Order, User } from './models/types';

export const useUsers = ({ orderBy, order, limit, name }: Order) => {
  let queries = [];
  if (order) queries.push(`order=${order}`);
  if (orderBy) queries.push(`orderBy=${orderBy}`);
  if (limit) queries.push(`limit=${limit}`);
  if (name) queries.push(`name=${name}`);

  let key = '/user';
  if (queries.length) key += `?${queries.join('&')}`;

  const { data, error, isLoading, mutate } = useSWR<User[]>(key);

  return {
    error,
    isLoading,
    users: data,
    mutateUsers: mutate,
  };
};
