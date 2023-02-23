import { Schema } from 'ottoman';

export const userSchema = new Schema({
  email: String,
  name: String,
  avatar: String,
  role: String,
  bio: String,
  points: Number,
});
