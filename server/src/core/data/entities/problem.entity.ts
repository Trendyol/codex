export class ProblemEntity {
  id: string;
  title: string;
  content: string;
  difficulty: number;
  defaultCodes: DefaultCodes[];
  isAvailable: boolean;
}

export type DefaultCodes = {
  language: number;
  defaultCode: string;
};
