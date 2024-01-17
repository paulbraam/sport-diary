import { Training } from '@prisma/client';
import { ApiRequest } from '~/shared/lib/types';

export type GetUserTrainingByIdRequest = ApiRequest<unknown, { id: string }>;

export type GetUserTrainingByIdResponse = Training;
