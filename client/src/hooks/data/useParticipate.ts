import { mutate } from 'swr';
import useMutation from 'swr/mutation';
import axios from 'axios';

export const useParticipate = () => {
  const { trigger } = useMutation(
    'participate',
    (_, { arg }) => axios.post(`/challenge/${arg}/participate`),
    {
      onSuccess: () => mutate('/challenge'),
    },
  );

  return {
    participate: trigger,
  };
};
