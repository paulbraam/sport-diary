import type { Training } from '@prisma/client';
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
  currentTraining: Training;
}
