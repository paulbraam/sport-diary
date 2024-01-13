import { type Training, type Prisma } from '@prisma/client';
import { type ApiRequest } from '~/types/api';

// POST

export type CreateUserTrainingRequestBody = {
  training: Prisma.TrainingCreateWithoutUserParamsInput;
  userParams: Prisma.UserParamsCreateInput;
};

export type CreateUserTrainingRequest = ApiRequest<CreateUserTrainingRequestBody>;

export type CreateUserTrainingResponse = Training;

// GET

export type GetUserTrainingsResponse = Training[];

// utils

export type CreateUserTrainingData = CreateUserTrainingRequestBody;
