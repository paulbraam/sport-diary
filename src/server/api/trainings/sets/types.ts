import { Prisma, TrainingSet } from '@prisma/client';
import { ApiRequest } from '~/shared/lib/types';

export type TrainingSetPayload = Omit<
  Prisma.TrainingSetCreateInput,
  'TrainingExercise' | 'CatalogExercise'
>;

// POST

export type CreateTrainingSetRequestBody = {
  trainingExerciseId: string;
  data: TrainingSetPayload;
};

export type CreateTrainingSetRequest = ApiRequest<CreateTrainingSetRequestBody>;

export type CreateTrainingSetResponse = TrainingSet;
