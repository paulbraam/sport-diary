import * as z from 'zod';
import type { TrainingFormValidationSchema } from './types';

export const trainingFormValidationSchema = toTypedSchema<z.ZodType<TrainingFormValidationSchema>>(
  z.object({
    training: z.object({
      startedAt: z.union([z.date(), z.string()]).transform((value) => new Date(value)),
      endedAt: z
        .union([z.date(), z.string()])
        .transform((value) => new Date(value))
        .optional(),
      comment: z.string().max(10, { message: 'Too long' }).optional()
    })
  })
);
