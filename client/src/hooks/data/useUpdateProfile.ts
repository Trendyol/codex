import useMutation from 'swr/mutation';
import axios from 'axios';
import { mutate } from 'swr';

export const useUpdateProfile = (successCallback?: () => void, errorCallback?: () => void) => {
  const { trigger, error } = useMutation(
    'updateProfile',
    (_, { arg: { id, data } }) => axios.put(`/user/${id}/profile`, data),
    {
      onSuccess: ({ data }) => {
        mutate('/user/me');
        mutate(`/user/${data.id}`);
        successCallback?.();
      },
      onError: () => {
        errorCallback && errorCallback();
      },
    },
  );

  return {
    updateProfile: trigger,
    updateProfileError: error,
  };
};
