import { Challenge } from '@hooks/data/models/types';

export const mockChallenges = [
  {
    id: '1',
    name: 'Weekly Challenge 1',
    ranking: 2,
    score: 330,
    date: '2021-09-01',
    question: '',
    status: 1,
    participated: true,
    teamSize: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ante eget quam volutpat luctus. Duis efficitur tristique leo in efficitur. Proin pellentesque luctus purus, ut sollicitudin ipsum. Cras lacinia lobortis tincidunt.',
  },
  {
    id: '2',
    name: 'Weekly Challenge 2',
    ranking: 5,
    score: 330,
    date: '2021-09-01',
    participated: true,
    status: 1,
    teamSize: 2,
    question: '',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ante eget quam volutpat luctus. Duis efficitur tristique leo in efficitur. Proin pellentesque luctus purus, ut sollicitudin ipsum. Cras lacinia lobortis tincidunt.',
  },
  {
    id: '3',
    name: 'Weekly Challenge 3',
    ranking: 15,
    score: 330,
    date: '2021-09-01',
    status: 1,
    question: '',
    participated: true,
    teamSize: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ante eget quam volutpat luctus. Duis efficitur tristique leo in efficitur. Proin pellentesque luctus purus, ut sollicitudin ipsum. Cras lacinia lobortis tincidunt.',
  },
];

export const challengeTableFields: Partial<keyof Challenge>[] = [
  'name',
  'score',
  'ranking',
  'date',
];
