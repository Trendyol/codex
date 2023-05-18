import { Schema } from 'ottoman';

const baseSchema = {
  userId: String,
  content: String,
  isApproved: Boolean,
  isPublished: Boolean,
  likedBy: [{ type: String }],
  type: String,
};

export const articleSchema = new Schema({
  ...baseSchema,
  title: String,
});

export const discussionSchema = new Schema({
  ...baseSchema,
  title: String,
  problemId: String,
});

export const commentSchema = new Schema({
  ...baseSchema,
  parentId: String,
  depth: Number,
});
