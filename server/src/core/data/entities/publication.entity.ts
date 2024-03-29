export class BasePublicationEntity {
  readonly id: string;
  readonly content: string;
  readonly isPublished: boolean;
  readonly likedBy: string[];
  readonly userId: string;
}

export class ArticleEntity extends BasePublicationEntity {
  readonly title: string;
  readonly isApproved?: boolean;
}

export class DiscussionEntity extends BasePublicationEntity {
  readonly title: string;
  readonly problemId: string;
}

export class CommentEntity extends BasePublicationEntity {
  readonly parentId: string;
  readonly depth: number;
}
