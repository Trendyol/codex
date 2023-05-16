import axios from 'axios';

export const getMe = async (cookie?: string) => {
  try {
    const request = await axios.get('/user/me', { headers: { cookie }, withCredentials: true });
    return request.data;
  } catch (err) {
    return null;
  }
};
