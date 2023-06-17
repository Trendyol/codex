import { DateTime } from 'luxon';
import { Schema } from 'ottoman';

const baseSchema = {
  userId: { type: String, ref: 'user' },
  content: String,
  isApproved: Boolean,
  isPublished: Boolean,
  likedBy: [{ type: String }],
  createdAt: { type: Date, default: DateTime.now().toJSDate() },
};

export const articleSchema = new Schema({
  ...baseSchema,
  title: String,
});

export const discussionSchema = new Schema({
  ...baseSchema,
  title: String,
  problemId: { type: String, ref: 'problem' },
});

export const commentSchema = new Schema({
  ...baseSchema,
  parentId: String,
  depth: Number,
});
