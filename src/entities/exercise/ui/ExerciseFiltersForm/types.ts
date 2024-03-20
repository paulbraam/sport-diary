import type { GetCatalogExercisesQueryParams } from '~/server/api/catalog/exercises/types';

export type ExerciseFiltersForm = Omit<GetCatalogExercisesQueryParams, 'contains'>;

export type ExerciseFiltersFormEmits = {
  (eventName: 'onSubmit', value: ExerciseFiltersForm): void;
};
