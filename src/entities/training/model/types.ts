import type { Training } from '@prisma/client';
import type { TrainingSetWithExercise } from '~/server/api/trainings/sets/types';
import type { CreateUserTrainingRequestBody } from '~/server/api/trainings/types';
import type { PickWithOptional } from '~/shared/lib/types';

// form

export type TrainingFormValidationSchema = PickWithOptional<
  CreateUserTrainingRequestBody,
  'startedAt' | 'endedAt' | 'comment'
>;

export type ITrainingForm = TrainingFormValidationSchema;

// store

export interface TrainingsState {
  trainings: Training[];
  currentTrainings: Record<string, Training>;
  currentTrainingSets: Record<string, TrainingSetWithExercise[]>;
}
