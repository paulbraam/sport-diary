import { CatalogExercise } from '@prisma/client';
import { UserSettingsWithExercises } from '../types';
import { ApiRequest } from '~/shared/lib/types';

export type UpdateUserExercisesRequestBody = {
  exerciseIds: Array<CatalogExercise['id']>;
};

export type UpdateUserExercisesRequest = ApiRequest<UpdateUserExercisesRequestBody>;

export type UpdateUserExercisesResponse = UserSettingsWithExercises['exercises'];
