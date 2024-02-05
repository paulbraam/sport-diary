import { defineStore } from 'pinia';
import type { UserSettingsState } from './types';
import { USER_SETTINGS_INITIAL_STATE, USER_SETTINGS_STORE_NAME } from './const';
import { RequestStatus } from '~/shared/lib/const';
import { request } from '~/shared/api';
import { createRequestState } from '~/shared/lib/utils';
import type {
  GetUserSettingsResponse,
  UserSettingsWithExercises
} from '~/server/api/user/settings/types';
import type { UpdateUserExercisesResponse } from '~/server/api/user/settings/exercises/types';
import type { DeleteUserExerciseResponse } from '~/server/api/user/settings/exercises/[id]/types';

export const useUserSettingsStore = defineStore(USER_SETTINGS_STORE_NAME, () => {
  const getUserSettingsRequest = createRequestState<UserSettingsWithExercises>();
  const updateUserExercisesRequest = createRequestState<UserSettingsWithExercises['exercises']>();
  const deleteUserExerciseRequest = createRequestState();
  const state = reactive<UserSettingsState>({
    ...USER_SETTINGS_INITIAL_STATE
  });

  const deleteUserExercise = async (
    exerciseId: string
  ): Promise<DeleteUserExerciseResponse | null> => {
    deleteUserExerciseRequest.status = RequestStatus.PENDING;
    deleteUserExerciseRequest.error = null;

    try {
      const { data } = await request<DeleteUserExerciseResponse>(
        `/api/user/settings/exercises/${exerciseId}`,
        {
          method: 'DELETE'
        }
      );

      deleteUserExerciseRequest.status = RequestStatus.SUCCESS;
      deleteUserExerciseRequest.data = data;

      state.settings.exercises = state.settings.exercises.filter(
        (exercise) => exercise.id !== data.id
      );

      return data;
    } catch (error) {
      deleteUserExerciseRequest.status = RequestStatus.FAILED;
      deleteUserExerciseRequest.error = error;

      return null;
    }
  };

  const updateUserExercises = async (
    exerciseIds: string[]
  ): Promise<UpdateUserExercisesResponse | null> => {
    updateUserExercisesRequest.status = RequestStatus.PENDING;
    updateUserExercisesRequest.error = null;

    try {
      const { data } = await request<UpdateUserExercisesResponse>('/api/user/settings/exercises', {
        method: 'PUT',
        data: {
          exerciseIds
        }
      });

      updateUserExercisesRequest.status = RequestStatus.SUCCESS;
      updateUserExercisesRequest.data = data;

      state.settings.exercises = data;

      return data;
    } catch (error) {
      updateUserExercisesRequest.status = RequestStatus.FAILED;
      updateUserExercisesRequest.error = error;

      return null;
    }
  };

  const getUserSettings = async (): Promise<GetUserSettingsResponse | null> => {
    getUserSettingsRequest.status = RequestStatus.PENDING;
    getUserSettingsRequest.error = null;

    try {
      const { data } = await request<UserSettingsWithExercises>('/api/user/settings', {
        method: 'GET'
      });

      getUserSettingsRequest.status = RequestStatus.SUCCESS;
      getUserSettingsRequest.data = data;

      state.settings = data;

      return data;
    } catch (error) {
      getUserSettingsRequest.status = RequestStatus.FAILED;
      getUserSettingsRequest.error = error;

      return null;
    }
  };

  return {
    state,
    requests: computed(() => ({
      getUserSettings: getUserSettingsRequest,
      updateUserExercises: updateUserExercisesRequest,
      deleteUserExercise: deleteUserExerciseRequest
    })),
    actions: {
      getUserSettings,
      updateUserExercises,
      deleteUserExercise
    }
  };
});
