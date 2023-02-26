export class SubmissionEntity {
  id: string;
  code: string;
  userId: string;
  problemId: string;
  teamId?: string;
  challengeId?: string;
  status: number;
  runtime?: number;
  memory?: number;
  time?: number;
  score?: number;
  date: Date;
}
