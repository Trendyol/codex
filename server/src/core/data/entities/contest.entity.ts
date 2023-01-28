export class ContestEntity {
  id: string;
  name: string;
  question: string;
  status: number;
  participants: string[];
  teams: string[][];
  date: Date;
}
