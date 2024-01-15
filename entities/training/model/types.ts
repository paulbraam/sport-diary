import type { Training } from '@prisma/client';
import type { CreateUserTrainingRequestBody } from '~/server/api/trainings/types';
import type { PickWithOptional } from '~/types/common';

// form

type TrainingValidationSchema = PickWithOptional<
  CreateUserTrainingRequestBody['training'],
  'startedAt' | 'endedAt' | 'comment'
>;

type UserParamsValidationSchema = PickWithOptional<
  CreateUserTrainingRequestBody['userParams'],
  'weight' | 'heartRate'
>;

export interface TrainingFormValidationSchema {
  training: TrainingValidationSchema;
  userParams: UserParamsValidationSchema;
}

export type ITrainingForm = {
  training: {
    startedAt: string;
    endedAt: string;
  };
  userParams: {
    weight: number;
    heartRate: number;
  };
};

// store

export interface TrainingsState {
  trainings: Training[];
  currentTraining: Training;
}
