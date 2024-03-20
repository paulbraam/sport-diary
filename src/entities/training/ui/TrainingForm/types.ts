import type { CreateUserTrainingRequestBody } from '~/server/api/trainings/types';
import type { PickWithOptional } from '~/shared/lib/types';

export type TrainingForm = PickWithOptional<
  CreateUserTrainingRequestBody,
  'startedAt' | 'endedAt' | 'comment'
>;

export type SubmitEventHandler = (values: CreateUserTrainingRequestBody) => void;
