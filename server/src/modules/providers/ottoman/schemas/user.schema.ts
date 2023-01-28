import { Schema } from 'ottoman';

export const userSchema = new Schema({
  email: String,
  name: String,
  role: String,
});
