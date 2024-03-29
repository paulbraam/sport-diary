import { ExerciseCategory, ExerciseEquipment, ExerciseForce, ExerciseMuscle } from '@prisma/client';
import { z } from 'zod';
import type { ExerciseFiltersForm } from './types';

export const exerciseFiltersModalFormValidationSchema = toTypedSchema<
  z.ZodType<ExerciseFiltersForm>
>(
  z.object({
    muscle: z.union([z.nativeEnum(ExerciseMuscle), z.literal('')]),
    category: z.union([z.nativeEnum(ExerciseCategory), z.literal('')]),
    equipment: z.union([z.nativeEnum(ExerciseEquipment), z.literal('')]),
    force: z.union([z.nativeEnum(ExerciseForce), z.literal('')])
  })
);
