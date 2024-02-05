import { type Training, type Prisma } from '@prisma/client';
import { type ApiRequest } from '~/shared/lib/types';

// POST

export type CreateUserTrainingRequestBody = {
  training: Prisma.TrainingCreateInput;
};

export type CreateUserTrainingRequest = ApiRequest<CreateUserTrainingRequestBody>;

export type CreateUserTrainingResponse = Training;

// GET

export type GetUserTrainingsResponse = Training[];

// utils

export type CreateUserTrainingData = CreateUserTrainingRequestBody;
