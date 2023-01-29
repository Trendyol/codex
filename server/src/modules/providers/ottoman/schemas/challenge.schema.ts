import { Schema } from 'ottoman';

import { userSchema } from './user.schema';

export const challengeSchema = new Schema({
  name: String,
  question: String,
  status: String,
  teamSize: Number,
  participants: [{ type: userSchema, ref: 'user' }],
  duration: Number,
  date: String,
});
