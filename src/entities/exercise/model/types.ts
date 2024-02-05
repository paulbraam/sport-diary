import type {
  CatalogExercise,
  ExerciseCategory,
  ExerciseEquipment,
  ExerciseForce,
  ExerciseMuscle
} from '@prisma/client';
import type { GetCatalogExercisesQueryParams } from '~/server/api/catalog/exercises/types';

export interface CatalogExercisesState {
  exercises: CatalogExercise[];
}

export type ExerciseMuscleMap = {
  [T in ExerciseMuscle]: string;
};

export type ExerciseEquipmentMap = {
  [T in ExerciseEquipment]: string;
};

export type ExerciseCategoryMap = {
  [T in ExerciseCategory]: string;
};

export type ExerciseForceMap = {
  [T in ExerciseForce]: string;
};

export type ExerciseFiltersForm = Omit<GetCatalogExercisesQueryParams, 'contains'>;
