import { Schema } from 'ottoman';

export const submissionSchema = new Schema({
  code: String,
  userId: { type: String, ref: 'user' },
  teamId: { type: String, ref: 'team' },
  problemId: { type: String, ref: 'problem' },
  challengeId: { type: String, ref: 'challenge' },
  runtime: Number,
  memory: Number,
  score: Number,
  time: Number,
  status: Number,
  date: Date,
});
