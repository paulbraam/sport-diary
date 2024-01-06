import { type Prisma } from '@prisma/client';
import { type ApiRequest } from '~/types/api';

export type CreateUserTrainingRequestBody = Prisma.TrainingCreateInput;

export type CreateUserTrainingRequest = ApiRequest<CreateUserTrainingRequestBody>;
