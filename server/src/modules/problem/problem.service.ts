import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';

import { CreateProblemDto } from './dtos/create-problem.dto';

@Injectable()
export class ProblemService {
  constructor(private readonly dataService: IDataService) {}

  async findAll() {
    const problems = await this.dataService.problems.find({});
    return problems;
  }

  async findById(id: string) {
    const problem = await this.dataService.problems.findById(id);
    return problem;
  }

  async create(createProblemDto: CreateProblemDto) {
    const problem = await this.dataService.problems.create(createProblemDto);

    return problem;
  }
}
