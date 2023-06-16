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

  async createArticle(createDto: CreateArticleDto, userId: string) {
    return await this.dataService.articles.create({
      ...createDto,
      userId,
      likedBy: [],
      isApproved: false,
    });
  }

  async createDiscussion(createDto: CreateDiscussionDto, userId: string) {
    return await this.dataService.discussions.create({
      ...createDto,
      userId,
      likedBy: [],
    });
  }

  async createComment(createDto: CreateCommentDto, userId: string) {
    return await this.dataService.comments.create({
      ...createDto,
      userId,
      likedBy: [],
    });
  }

  async findArticles() {
    return await this.dataService.queries.findArticles();
  }

  async findDraftArticles(userId: string) {
    return await this.dataService.queries.findDraftArticles(userId);
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

  async findComments(parentId: string, userId: string, isPublished: boolean) {
    const filter: any = {};

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
    return await this.dataService.queries.findArticle(id);
  }

  async findDiscussionById(id: string) {
    return await this.dataService.discussions.findById(id);
  }

  async findCommentById(id: string) {
    return await this.dataService.comments.findById(id);
  }
}
