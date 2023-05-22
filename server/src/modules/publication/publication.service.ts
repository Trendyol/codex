import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';

import {
  CreateArticleDto,
  CreateCommentDto,
  CreateDiscussionDto,
} from './dtos/create-publication.dto';

@Injectable()
export class PublicationService {
  constructor(private readonly dataService: IDataService) {}

  async createArticle(createDto: CreateArticleDto) {
    return await this.dataService.articles.create(createDto);
  }

  async createDiscussion(createDto: CreateDiscussionDto) {
    return await this.dataService.discussions.create(createDto);
  }

  async createComment(createDto: CreateCommentDto) {
    return await this.dataService.comments.create(createDto);
  }
}
