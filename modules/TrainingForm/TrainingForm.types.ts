import type { CreateUserTrainingRequestBody } from '~/server/api/trainings/types';
import type { Nullable } from '~/types/common';

type TrainingValidationSchema = Pick<CreateUserTrainingRequestBody['training'], 'at'>;

type UserParamsValidationSchema = Pick<
  CreateUserTrainingRequestBody['userParams'],
  'weight' | 'heartRate'
>;

export interface TrainingFormValidationSchema {
  training: TrainingValidationSchema;
  userParams: UserParamsValidationSchema;
}

export type TrainingForm = {
  training: {
    at: Nullable<string>;
  };
  userParams: {
    weight: Nullable<number>;
    heartRate: Nullable<number>;
  };
};
