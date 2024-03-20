import { Prisma, TrainingSet } from '@prisma/client';
import { TrainingExerciseWithCatalogExerciseAndSets } from '../exercises/types';
import { ApiRequest } from '~/shared/lib/types';

export type TrainingSetPayload = Omit<
  Prisma.TrainingSetCreateInput,
  'TrainingExercise' | 'CatalogExercise'
>;

// POST

export type CreateTrainingSetRequestBody = {
  trainingExerciseId: TrainingExerciseWithCatalogExerciseAndSets['id'];
  data: TrainingSetPayload;
};

export type CreateTrainingSetRequest = ApiRequest<CreateTrainingSetRequestBody>;

export type CreateTrainingSetResponse = TrainingSet;
