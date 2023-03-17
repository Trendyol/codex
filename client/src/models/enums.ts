export enum Status {
  upcoming = 1,
  pending = 2,
  ongoing = 3,
  finished = 4,
}

export enum Difficulty {
  easy = 1,
  medium = 2,
  hard = 3,
}

export enum Language {
  javascript = 63,
}

export enum SubmissionStatus {
  'In Queue' = 1,
  'Processing' = 2,
  'Accepted' = 3,
  'Wrong Answer' = 4,
  'Time Limit Exceeded' = 5,
  'Compilation Error' = 6,
  'Runtime Error (SIGSEGV)' = 7,
  'Runtime Error (SIGXFSZ)' = 8,
  'Runtime Error (SIGFPE)' = 9,
  'Runtime Error (SIGABRT)' = 10,
  'Runtime Error (NZEC)' = 11,
  'Runtime Error (Other)' = 12,
  'Internal Error' = 13,
  'Exec Format Error' = 14,
}

export enum SubmissionTypes {
  Run = 'run',
  Submission = 'submission',
  Accepted = 'accepted',
}

export enum SubmissionTabs {
  Testcase = 'Testcase',
  Result = 'Result',
}
