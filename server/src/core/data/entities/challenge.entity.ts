export class ChallengeEntity {
  id: string;
  name: string;
  question: string;
  status: number;
  participants: string[];
  teamSize: number;
  duration: number;
  date: Date;
}
