import useMutation from 'swr/mutation';
import axios from 'axios';
import { mutate } from 'swr';
import { jsonToFormData } from '@utils/converter';

export type UpdateProfileValues = {
  name: string;
  bio: string;
  avatar: File & { preview: string };
};

export const useUpdateProfile = (successCallback?: () => void, errorCallback?: () => void) => {
  const { trigger, error } = useMutation(
    'updateProfile',
    (_, { arg: { id, data } }) => {
      const formData = jsonToFormData(data);
      return axios.put(`/user/${id}/profile`, formData);
    },
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
