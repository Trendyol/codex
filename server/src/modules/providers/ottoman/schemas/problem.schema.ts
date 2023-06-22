import { Schema } from 'ottoman';

export const problemSchema = new Schema({
  title: String,
  content: String,
  difficulty: Number,
  isAvailable: Boolean,
  defaultCodes: [{ type: Object }],
});
