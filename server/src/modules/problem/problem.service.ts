import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';

import { CreateProblemDto } from './dtos/create-problem.dto';

@Injectable()
export class ProblemService {
  constructor(private readonly dataService: IDataService) {}

  async findAll(userId?: string, tags?: string[]) {
    return await this.dataService.queries.findProblems(userId || '', tags);
  }

  async findById(id: string) {
    const problem = await this.dataService.problems.findById(id);
    return problem;
  }

  async create(createProblemDto: CreateProblemDto) {
    const problem = await this.dataService.problems.create(createProblemDto);

    return problem;
  }

  async findDefaultCode(id: string, language: number) {
    const problem = await this.dataService.problems.findById(id);
    const defaultCode = problem.defaultCodes.find(
      (defaultCode) => defaultCode.language == language,
    ).defaultCode;

    return defaultCode;
  }

  async findProgression(userId: string) {
    const progression = await this.dataService.queries.findProblemProgression(userId);

    return progression;
  }
}
