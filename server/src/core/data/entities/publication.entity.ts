export class BasePublicationEntity {
  readonly userId: string;
  readonly content: string;
  readonly isApproved: boolean;
  readonly isPublished: boolean;
  readonly likedBy: string[];
  readonly type: 'article' | 'discussion' | 'comment';
}

export class ArticleEntity extends BasePublicationEntity {
  readonly title: string;
}

export class DiscussionEntity extends BasePublicationEntity {
  readonly title: string;
  readonly problemId: string;
}

export class CommentEntity extends BasePublicationEntity {
  readonly parentId: string;
  readonly depth: number;
}
