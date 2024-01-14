import { defineStore } from 'pinia';
import type { Training } from '@prisma/client';
import type { TrainingsState } from './types';
import { INITIAL_TRAININGS_STATE, TRAININGS_STORE_NAME } from './constants';
import type { Nullable } from '~/types/common';
import { createRequestState } from '~/types/store';
import { RequestStatus } from '~/constants/api';
import type {
  CreateUserTrainingResponse,
  CreateUserTrainingRequestBody,
  GetUserTrainingsResponse
} from '~/server/api/trainings/types';

export const useTrainingStore = defineStore(TRAININGS_STORE_NAME, () => {
  const createTrainingRequest = createRequestState<Training>();
  const getTrainingByIdRequest = createRequestState<Training>();
  const getTrainingsRequest = createRequestState<Training[]>();
  const state = reactive<Nullable<TrainingsState>>({ ...INITIAL_TRAININGS_STATE });

  const getTrainings = async (): Promise<GetUserTrainingsResponse | null> => {
    getTrainingsRequest.status = RequestStatus.PENDING;
    getTrainingsRequest.error = null;

    try {
      const { data } = await request<GetUserTrainingsResponse>('/api/trainings', {
        method: 'GET'
      });

      getTrainingsRequest.status = RequestStatus.SUCCESS;
      getTrainingsRequest.data = data;

      state.trainings = data;

      return data;
    } catch (error) {
      getTrainingsRequest.status = RequestStatus.FAILED;
      getTrainingsRequest.error = error;

      return null;
    }
  };

  const createTraining = async (
    payload: CreateUserTrainingRequestBody
  ): Promise<CreateUserTrainingResponse | null> => {
    createTrainingRequest.status = RequestStatus.PENDING;
    createTrainingRequest.error = null;

    try {
      const { data } = await request<CreateUserTrainingResponse>('/api/trainings', {
        method: 'POST',
        data: payload
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

  const getTrainingById = async (
    trainingId: string
  ): Promise<CreateUserTrainingResponse | null> => {
    getTrainingByIdRequest.status = RequestStatus.PENDING;
    getTrainingByIdRequest.error = null;

    try {
      const { data } = await request<CreateUserTrainingResponse>(`/api/trainings/${trainingId}`, {
        method: 'GET'
      });

      getTrainingByIdRequest.status = RequestStatus.SUCCESS;
      getTrainingByIdRequest.data = data;

      return data;
    } catch (error) {
      getTrainingByIdRequest.status = RequestStatus.FAILED;
      getTrainingByIdRequest.error = error;

      return null;
    }
  };

  return {
    state,
    requests: computed(() => ({
      createTraining: createTrainingRequest,
      getTrainings: getTrainingsRequest,
      getTrainingById: getTrainingByIdRequest
    })),
    actions: {
      createTraining,
      getTrainings,
      getTrainingById
    }
  };
});
