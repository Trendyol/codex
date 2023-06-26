import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';

import { CreateTagDto } from './dtos/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly dataService: IDataService) {}

  create(createTagDto: CreateTagDto) {
    return this.dataService.tags.create(createTagDto);
  }

  findAll(forArticle: boolean, forProblem: boolean) {
    return this.dataService.tags.find({
      ...(forArticle && { forArticle }),
      ...(forProblem && { forProblem }),
    });
  }
}
