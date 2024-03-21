import type { CatalogExercise } from '@prisma/client';
import type { GetCatalogExercisesQueryParams } from '~/server/api/catalog/exercises/types';

export interface CatalogExercisesState {
  exercises: CatalogExercise[];
}

export type ExerciseFilters = GetCatalogExercisesQueryParams;
