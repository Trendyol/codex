import { Schema } from 'ottoman';

export const teamSchema = new Schema({
  contestId: { type: String, ref: 'contest' },
  participants: [{ type: String, ref: 'user' }],
});
