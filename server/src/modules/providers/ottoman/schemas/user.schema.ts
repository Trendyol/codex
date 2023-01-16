import { createOttomanSchema } from '@ottoman/helpers';

export const userSchema = createOttomanSchema<'User'>({ email: String, name: String });
