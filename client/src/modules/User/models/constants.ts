import { UserChallenge } from '@hooks/data/models/types';

export const challengeTableFields: Partial<keyof UserChallenge>[] = [
  'name',
  'ranking',
  'date',
];
