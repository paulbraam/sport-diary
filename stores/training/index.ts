import { defineStore } from 'pinia';
import type { Training } from '@prisma/client';
import type { TrainingsState } from './types';
import { INITIAL_TRAININGS_STATE, TRAININGS_STORE_NAME } from './constants';
import type { Nullable } from '~/types/common';
import { createRequestState } from '~/types/store';
import { RequestStatus } from '~/constants/api';
import type {
  CreateUserTrainingResponse,
  CreateUserTrainingRequestBody
} from '~/server/api/trainings/types';

export const useTrainingStore = defineStore(TRAININGS_STORE_NAME, () => {
  const createTrainingRequest = createRequestState<Training>();
  const state = reactive<Nullable<TrainingsState>>({ ...INITIAL_TRAININGS_STATE });

  const createTraining = async (
    payload: CreateUserTrainingRequestBody
  ): Promise<CreateUserTrainingResponse | null> => {
    createTrainingRequest.status = RequestStatus.PENDING;
    createTrainingRequest.error = null;

    try {
      const data = await $fetch<CreateUserTrainingResponse>('/api/trainings', {
        method: 'POST',
        body: payload
      });

      createTrainingRequest.status = RequestStatus.SUCCESS;
      createTrainingRequest.data = data;

      return data;
    } catch (error) {
      createTrainingRequest.status = RequestStatus.FAILED;
      createTrainingRequest.error = error;

      return null;
    }
  };

  return {
    state,
    requests: computed(() => ({
      createTraining: createTrainingRequest
    })),
    actions: {
      createTraining
    }
  };
});
