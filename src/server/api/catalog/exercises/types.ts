import {
  CatalogExercise,
  ExerciseCategory,
  ExerciseEquipment,
  ExerciseForce,
  ExerciseMuscle
} from '@prisma/client';
import { type ApiRequest } from '~/shared/lib/types';

// GET

export type GetCatalogExercisesQueryParams = {
  limit?: string | '';
  muscle: ExerciseMuscle | '';
  force: ExerciseForce | '';
  category: ExerciseCategory | '';
  equipment: ExerciseEquipment | '';
  contains: string;
};

export type GetCatalogExercisesRequest = ApiRequest<unknown, GetCatalogExercisesQueryParams>;

export type GetCatalogExercisesResponse = CatalogExercise[];
