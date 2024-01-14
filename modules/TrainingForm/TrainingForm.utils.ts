import * as z from 'zod';
import type { TrainingFormValidationSchema } from './TrainingForm.types';

export const trainingFormValidationSchema = toTypedSchema<z.ZodType<TrainingFormValidationSchema>>(
  z.object({
    training: z.object({
      at: z.union([z.date(), z.string()]).transform((value) => new Date(value))
    }),
    userParams: z.object({
      weight: z.number().min(1, { message: 'Too short' }),
      heartRate: z.number().min(1, { message: 'Too short' })
    })
  })
);
