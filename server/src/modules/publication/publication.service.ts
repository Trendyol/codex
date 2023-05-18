import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';

import { CreateArticleDto } from './dtos/create-article.dto';

@Injectable()
export class PublicationService {
  constructor(private readonly dataService: IDataService) {}

  async createArticle(createDto: CreateArticleDto) {
    return await this.dataService.articles.create({ ...createDto, type: 'article' });
  }
}
