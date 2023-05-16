import axios from 'axios';

export const getChallenges = async (cookie?: string) => {
  try {
    const request = await axios.get('/challenge', { headers: { cookie }, withCredentials: true });
    return request.data;
  } catch (err) {
    return null;
  }
};
