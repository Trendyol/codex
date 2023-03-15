export const getHashAvatar = (hash = '') => {
  if (!hash) return '';
  return `https://avatars.dicebear.com/api/avataaars/${hash}.svg`;
};
