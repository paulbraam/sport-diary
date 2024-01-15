import type { CreateUserTrainingRequestBody } from '~/server/api/trainings/types';
import type { PickWithOptional } from '~/types/common';

type Training = CreateUserTrainingRequestBody['training'];

type UserParams = CreateUserTrainingRequestBody['userParams'];

type TrainingValidationSchema = PickWithOptional<Training, 'startedAt' | 'endedAt' | 'comment'>;

type UserParamsValidationSchema = PickWithOptional<UserParams, 'weight' | 'heartRate'>;

export interface TrainingFormValidationSchema {
  training: TrainingValidationSchema;
  userParams: UserParamsValidationSchema;
}

export type TrainingForm = {
  training: {
    startedAt: string;
    endedAt: string;
  };
  userParams: {
    weight: number;
    heartRate: number;
  };
};
