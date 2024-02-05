import type { CatalogExercise } from '@prisma/client';
import type { GetCatalogExercisesQueryParams } from '~/server/api/catalog/exercises/types';

export interface UserSettingsState {
  settings: {
    exercises: CatalogExercise[];
  };
}

export type ExerciseFiltersForm = Omit<GetCatalogExercisesQueryParams, 'contains'>;
