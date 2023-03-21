export const getHashAvatar = (hash = '') => {
  if (!hash) return '';
  return `https://api.dicebear.com/5.x/thumbs/png?seed=${hash}`;
};
