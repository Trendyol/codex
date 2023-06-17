import { cx } from 'class-variance-authority';
import { ClassValue } from 'class-variance-authority/dist/types';
import { twMerge } from 'tailwind-merge';
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

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(cx(inputs));
};
