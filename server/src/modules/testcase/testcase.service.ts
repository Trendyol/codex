import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';

import { CreateTestcaseDto } from './dtos/create-testcase.dto';

@Injectable()
export class TestcaseService {
  constructor(private readonly dataService: IDataService) {}
  async create(createTestcaseDto: CreateTestcaseDto) {
    return this.dataService.testcases.create(createTestcaseDto);
  }

  async get(problemId: string) {
    return this.dataService.testcases.find({ problemId, isPublic: true });
  }
}
