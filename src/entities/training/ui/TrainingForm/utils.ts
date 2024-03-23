import { z } from 'zod';
import type { TrainingForm } from './types';
import { DEFAULT_COMMENT_LENGTH } from './const';

export const trainingFormValidationSchema = toTypedSchema<z.ZodType<TrainingForm>>(
  z.object({
    startedAt: z.union([z.date(), z.string()]).transform((value) => new Date(value)),
    endedAt: z
      .union([z.date(), z.string()])
      .transform((value) => new Date(value))
      .optional(),
    comment: z.string().max(DEFAULT_COMMENT_LENGTH, { message: 'Слишком длинный текст' }).optional()
  })
);
