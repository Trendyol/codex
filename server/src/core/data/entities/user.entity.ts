export class UserEntity {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  bio?: string;
  points: number;
  rank?: number;
  challenges: UserChallenge[];
  problems: string[];
}

export type UserChallenge = { id: string; name: string; date: Date; ranking: number };
