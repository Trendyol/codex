import { Schema } from 'ottoman';

export const testcaseSchema = new Schema({
  stdin: String,
  expected_output: String,
  isPublic: Boolean,
  problemId: { type: String, ref: 'problem' },
});
