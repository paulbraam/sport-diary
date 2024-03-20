import type { CatalogExercisesState, ExerciseFilters } from './types';

// STORE

export const CATALOG_EXERCISES_STORE_NAME = 'catalog_exercises';

export const CATALOG_EXERCISES_INITIAL_STATE: CatalogExercisesState = {
  exercises: []
};

export const EXERCISE_FILTERS_INITIAL_STATE: ExerciseFilters = {
  muscle: '',
  force: '',
  category: '',
  equipment: '',
  contains: ''
};

// FORMS

export const EXERCISE_FILTERS_FORM_ID = 'exercise-filters-form';

// MODALS

export const EXERCISE_FILTERS_MODAL_ID = 'exercise-filters-modal';

export enum ExerciseFiltersModalRoles {
  APPLY = 'APPLY',
  CLOSE = 'CLOSE'
}

export const USER_EXERCISES_MODAL_ID = 'user-exercises-modal';

export enum UserExercisesModalRoles {
  APPLY = 'APPLY',
  CLOSE = 'CLOSE'
}
