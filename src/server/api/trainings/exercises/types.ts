import { Prisma } from '@prisma/client';
import { ApiRequest } from '~/shared/lib/types';

export type TrainingExerciseWithCatalogExerciseAndSets = Prisma.TrainingExerciseGetPayload<{
  include: {
    exercise: true;
    sets: true;
  };
}>;

// POST

export type CreateTrainingExerciseRequestBody = {
  exerciseId: string;
  trainingId: string;
};

export type CreateTrainingExerciseRequest = ApiRequest<CreateTrainingExerciseRequestBody>;

export type CreateTrainingExerciseResponse = TrainingExerciseWithCatalogExerciseAndSets;

// GET

export type GetTrainingExercisesRequestParams = {
  trainingId: string;
};

export type GetTrainingExercisesRequest = ApiRequest<unknown, GetTrainingExercisesRequestParams>;

export type GetTrainingExercisesResponse = TrainingExerciseWithCatalogExerciseAndSets[];
