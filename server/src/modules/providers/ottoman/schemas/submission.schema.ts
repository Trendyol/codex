import { createOttomanSchema } from '@ottoman/helpers';

export const submissionSchema = createOttomanSchema<'Submission'>({ code: String });
