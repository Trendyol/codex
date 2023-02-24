export class ChallengeEntity {
  id: string;
  name: string;
  description: string;
  status: number;
  participants: string[];
  activeParticipants: string[];
  teamSize: number;
  duration: number;
  date: Date;
  problem: string;
}
