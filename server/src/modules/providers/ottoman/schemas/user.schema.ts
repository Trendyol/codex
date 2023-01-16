import { Schema } from 'ottoman';

export interface User {
  name: string;
  email: string;
}

export const userSchema = new Schema({
  name: String,
  email: String,
});
