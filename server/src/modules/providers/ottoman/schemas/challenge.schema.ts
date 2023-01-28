import { Schema } from 'ottoman';

import { userSchema } from './user.schema';

export const challengeSchema = new Schema({
  name: String,
  question: String,
  status: String,
  participants: [{ type: userSchema, ref: 'user' }],
  date: String,
});
