import type { Training } from '@prisma/client';
import type { TrainingExerciseWithCatalogExerciseAndSets } from '~/server/api/trainings/exercises/types';
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
  trainings: Map<Training['id'], Training>;
  trainingExercises: Map<
    TrainingExerciseWithCatalogExerciseAndSets['id'],
    TrainingExerciseWithCatalogExerciseAndSets
  >;
}
