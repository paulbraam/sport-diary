import { Training } from '@prisma/client';
import { ApiRequest } from '~/types/api';

export type GetUserTrainingByIdRequest = ApiRequest<unknown, { id: string }>;

export type GetUserTrainingByIdResponse = Training;
