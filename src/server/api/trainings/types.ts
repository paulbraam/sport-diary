import { type Training, Prisma } from '@prisma/client';
import { type ApiRequest } from '~/shared/lib/types';

// POST

export type CreateUserTrainingRequestBody = Prisma.TrainingCreateInput;

export type CreateUserTrainingRequest = ApiRequest<CreateUserTrainingRequestBody>;

export type CreateUserTrainingResponse = Training;

// GET

export type GetUserTrainingsResponse = Training[];

// utils

export type CreateUserTrainingData = CreateUserTrainingRequestBody;
