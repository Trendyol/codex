import { Difficulty } from '@models/enums';

export type Challenge = {
  id: string;
  name: string;
  description: string;
  problem: Problem;
  status: number;
  teamSize: number;
  participated: boolean;
  date: string;
  duration: number;
  //
  score: number;
  ranking: number;
  difficulty: Difficulty;
  userParticipant: boolean;
  userActiveParticipant: boolean;
};

export type Testcase = {
  id: string;
  expected_output: string;
  stdin: string;
};

export type Problem = {
  id: string;
  title: string;
  content: string;
  difficulty: Difficulty;
  solved: boolean;
};

export type Submission = {
  challengeId?: string;
  code: string;
  date: string;
  id: string;
  memory: number;
  problemId: string;
  runtime: number;
  status: number;
  teamId?: string;
  time?: number;
  userId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio?: string;
  points: number;
  rank: number;
  challenges: UserChallenge[];
};

export type UserChallenge = {
  name: string;
  id: string;
  ranking: number;
  date: string;
};

export type Participant = {
  id: string;
  name: string;
};

export type Lobby = {
  id: string;
  name: string;
  question: string;
  status: number;
  teamSize: number;
  participants: Participant[];
  date: string;
};

export type Room = {
  id: string;
  name: string;
  question: string;
  status: number;
  teamSize: number;
  team: {
    id: string;
    participants: Participant[];
  };
  date: string;
};

export type Order = {
  name?: string;
  orderBy?: string;
  order?: string;
  limit?: number;
};

export type Placement = {
  date: string;
  teamId: string;
  participants: User[];
};
