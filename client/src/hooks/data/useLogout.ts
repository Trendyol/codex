import useMutation from 'swr/mutation';
import axios from 'axios';

export const useLogout = () => {
  const { trigger } = useMutation('logout', () => axios.get(`/auth/logout`), {
    onSuccess: () => window.location.reload(),
  });

  return {
    logout: trigger,
  };
};
