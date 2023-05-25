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

  async findArticles() {
    return await this.dataService.articles.find({});
  }

  async findDiscussions(problemId: string, userId: string, isPublished: boolean) {
    const filter: any = {};

    if (problemId !== undefined) {
      filter.problemId = problemId;
    }
    if (userId !== undefined) {
      filter.userId = userId;
    }
    if (isPublished !== undefined) {
      filter.isPublished = isPublished;
    }

    return await this.dataService.discussions.find(filter);
  }

  async findComments(depth: number, parentId: string, userId: string, isPublished: boolean) {
    const filter: any = {};

    if (depth !== undefined) {
      filter.depth = depth;
    }
    if (parentId !== undefined) {
      filter.parentId = parentId;
    }
    if (userId !== undefined) {
      filter.userId = userId;
    }
    if (isPublished !== undefined) {
      filter.isPublished = isPublished;
    }

    return await this.dataService.comments.find(filter);
  }

  async findArticleById(id: string) {
    return await this.dataService.articles.findById(id);
  }

  async findDiscussionById(id: string) {
    return await this.dataService.discussions.findById(id);
  }

  async findCommentById(id: string) {
    return await this.dataService.comments.findById(id);
  }
}
