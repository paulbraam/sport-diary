import * as z from 'zod';
import type { TrainingSetFormValidationSchema } from './types';

export const trainingSetFormValidationSchema = toTypedSchema<
  z.ZodType<TrainingSetFormValidationSchema>
>(
  z.object({
    exerciseId: z.string()
  })
);
