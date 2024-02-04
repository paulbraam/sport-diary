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

export const useUserSettingsStore = defineStore(USER_SETTINGS_STORE_NAME, () => {
  const getUserSettingsRequest = createRequestState<UserSettingsWithExercises>();
  const updateUserExercisesRequest = createRequestState<UserSettingsWithExercises['exercises']>();
  const state = reactive<UserSettingsState>({
    ...USER_SETTINGS_INITIAL_STATE
  });

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
      updateUserExercises: updateUserExercisesRequest
    })),
    actions: {
      getUserSettings,
      updateUserExercises
    }
  };
});
