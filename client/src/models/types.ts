import { SubmissionTypes } from './enums';

export type SubmissionResult = {
  created_at: string;
  expected_output: string;
  stdin: string;
  language: number;
  memory: number;
  code: string;
  status: number;
  runtime: number;
  stdout: string;
  totalTestcases?: number;
  passedTestcases?: number;
  type: SubmissionTypes;
};
