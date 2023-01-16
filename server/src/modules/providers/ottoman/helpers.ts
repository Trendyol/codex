import { Schema } from 'ottoman';

export function createOttomanSchema<T extends EntityNames>(obj: Entities[T]) {
  return new Schema(obj);
}
