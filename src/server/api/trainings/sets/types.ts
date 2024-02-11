import { Prisma } from '@prisma/client';
import { ApiRequest } from '~/shared/lib/types';

export type TrainingSetWithExercise = Prisma.TrainingSetGetPayload<{
  include: {
    exercise: true;
  };
}>;

// POST

export type CreateTrainingSetRequestBody = {
  exerciseId: string;
  trainingId: string;
};

export type CreateTrainingSetRequest = ApiRequest<CreateTrainingSetRequestBody>;

export type CreateTrainingSetResponse = TrainingSetWithExercise;

// GET

export type GetTrainingSetsRequestParams = {
  trainingId: string;
};

export type GetTrainingSetsRequest = ApiRequest<unknown, GetTrainingSetsRequestParams>;

export type GetTrainingSetsResponse = TrainingSetWithExercise[];
