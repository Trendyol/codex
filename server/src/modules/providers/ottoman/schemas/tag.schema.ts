import { Schema } from 'ottoman';

export const tagSchema = new Schema({
  title: String,
  forArticle: Boolean,
  forProblem: Boolean,
});
