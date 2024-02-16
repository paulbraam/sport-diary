import * as z from 'zod';
import type { TrainingExerciseFormValidationSchema } from './types';

export const trainingExerciseFormValidationSchema = toTypedSchema<
  z.ZodType<TrainingExerciseFormValidationSchema>
>(
  z.object({
    exerciseId: z.string()
  })
);
