import { Schema } from 'ottoman';

export const teamSchema = new Schema({
  challengeId: { type: String, ref: 'challenge' },
  participants: [{ type: String, ref: 'user' }],
});
