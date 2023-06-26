import { Schema } from 'ottoman';

import { tagSchema } from './tag.schema';

export const problemSchema = new Schema({
  title: String,
  content: String,
  difficulty: Number,
  defaultCodes: [{ type: Object }],
  tags: [{ type: tagSchema, ref: 'tag' }],
});
