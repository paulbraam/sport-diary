import { UserSettingsWithExercises } from '../types';
import { ApiRequest } from '~/shared/lib/types';

export type UpdateUserExercisesRequestBody = {
  exerciseIds: string[];
};

export type UpdateUserExercisesRequest = ApiRequest<UpdateUserExercisesRequestBody>;

export type UpdateUserExercisesResponse = UserSettingsWithExercises['exercises'];
