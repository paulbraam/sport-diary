import type { Intensity } from '@prisma/client';
import type { TrainingSetPayload } from '~/server/api/trainings/sets/types';

export type TrainingSetFormValidationSchema = TrainingSetPayload;

export type TrainingExerciseFormEmits = {
  (eventName: 'submit', value: TrainingSetPayload): void;
};

export type IntensityMap<T> = {
  [K in Intensity]: T;
};
