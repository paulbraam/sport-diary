import { z } from 'zod';
import { ExerciseCategory, ExerciseEquipment, ExerciseForce, ExerciseMuscle } from '@prisma/client';
import type { ExerciseFiltersForm } from './types';

export const exerciseFiltersFormValidationSchema = toTypedSchema<z.ZodType<ExerciseFiltersForm>>(
  z.object({
    muscle: z
      .union([z.nativeEnum(ExerciseMuscle), z.literal('')])
      .optional()
      .transform((value) => value || ''),
    category: z
      .union([z.nativeEnum(ExerciseCategory), z.literal('')])
      .optional()
      .transform((value) => value || ''),
    equipment: z
      .union([z.nativeEnum(ExerciseEquipment), z.literal('')])
      .optional()
      .transform((value) => value || ''),
    force: z
      .union([z.nativeEnum(ExerciseForce), z.literal('')])
      .optional()
      .transform((value) => value || '')
  })
);
