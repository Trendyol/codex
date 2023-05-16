import { uniqueNamesGenerator, adjectives, colors, Config } from 'unique-names-generator';

export const getSeedAvatar = (seed = '') => {
  if (!seed) return '';
  return `https://api.dicebear.com/5.x/thumbs/png?seed=${seed}`;
};

export const getSeedName = (seed = '') => {
  if (!seed) return '';
  const config: Config = {
    dictionaries: [adjectives, colors],
    separator: ' ',
    style: 'capital',
    seed,
  };

  return uniqueNamesGenerator(config);
};
