import * as z from 'zod';
import { Intensity } from '@prisma/client';
import type { IntensityMap, TrainingSetFormValidationSchema } from './types';

export const trainingSetFormValidationSchema = toTypedSchema<
  z.ZodType<TrainingSetFormValidationSchema>
>(
  z.object({
    reps: z.coerce.number().optional(),
    duration: z.coerce.number().optional(),
    weight: z.coerce.number().optional(),
    intensity: z.nativeEnum(Intensity).optional(),
    rest: z.coerce.number().optional()
  })
);

export const intensitySelectLabels: IntensityMap<string> = {
  [Intensity.HIGH]: 'Высокая',
  [Intensity.MEDIUM]: 'Средняя',
  [Intensity.LOW]: 'Низкая'
};

export const intensitySelectOptions = Object.values(Intensity).map((value) => ({
  label: intensitySelectLabels[value],
  value
}));
