import type { Training } from '@prisma/client';
import type { CreateUserTrainingRequestBody } from '~/server/api/trainings/types';
import type { PickWithOptional } from '~/shared/lib/types';

// form

type TrainingValidationSchema = PickWithOptional<
  CreateUserTrainingRequestBody['training'],
  'startedAt' | 'endedAt' | 'comment'
>;

export interface TrainingFormValidationSchema {
  training: TrainingValidationSchema;
}

export type ITrainingForm = {
  training: {
    startedAt: string;
    endedAt: string;
  };
};

// store

export interface TrainingsState {
  trainings: Training[];
  currentTraining: Training;
}
