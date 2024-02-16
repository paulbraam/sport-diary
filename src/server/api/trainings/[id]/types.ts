import { Training } from '@prisma/client';
import { ApiRequest } from '~/shared/lib/types';

// GET

export type GetUserTrainingByIdRequest = ApiRequest<unknown, { id: string }>;

export type GetUserTrainingByIdResponse = Training;

// DELETE

export type DeleteUserTrainingByIdResponse = Training;
