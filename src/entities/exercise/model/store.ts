import { defineStore } from 'pinia';
import type { CatalogExercise } from '@prisma/client';
import type { CatalogExercisesState, ExerciseFiltersForm } from './types';
import {
  CATALOG_EXERCISES_INITIAL_STATE,
  CATALOG_EXERCISES_STORE_NAME,
  exerciseFiltersInitialValues
} from './const';
import type { NullableObjectValues } from '~/shared/lib/types';
import { RequestStatus } from '~/shared/lib/const';
import { request } from '~/shared/api';
import { createRequestState } from '~/shared/lib/utils';
import type {
  GetCatalogExercisesQueryParams,
  GetCatalogExercisesResponse
} from '~/server/api/catalog/exercises/types';

export const useCatalogExercisesStore = defineStore(CATALOG_EXERCISES_STORE_NAME, () => {
  const getCatalogExercisesRequest = createRequestState<CatalogExercise[]>();
  const state = reactive<NullableObjectValues<CatalogExercisesState>>({
    ...CATALOG_EXERCISES_INITIAL_STATE
  });

  const getCatalogExercises = async (
    params: GetCatalogExercisesQueryParams
  ): Promise<GetCatalogExercisesResponse | null> => {
    getCatalogExercisesRequest.status = RequestStatus.PENDING;
    getCatalogExercisesRequest.error = null;

    try {
      const { data } = await request<GetCatalogExercisesResponse>('/api/catalog/exercises', {
        method: 'GET',
        params
      });

      getCatalogExercisesRequest.status = RequestStatus.SUCCESS;
      getCatalogExercisesRequest.data = data;

      state.exercises = data;

      return data;
    } catch (error) {
      getCatalogExercisesRequest.status = RequestStatus.FAILED;
      getCatalogExercisesRequest.error = error;

      return null;
    }
  };

  return {
    state,
    requests: computed(() => ({
      getCatalogExercises: getCatalogExercisesRequest
    })),
    actions: {
      getCatalogExercises
    }
  };
});

export const useUserExerciseFiltersStore = () => {
  const state = useState<ExerciseFiltersForm>(
    'user_exercise_filters',
    () => exerciseFiltersInitialValues
  );

  return {
    state,
    reset: () => {
      state.value = exerciseFiltersInitialValues;
    }
  };
};
