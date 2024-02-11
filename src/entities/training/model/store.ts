import { defineStore } from 'pinia';
import type { Training, TrainingSet } from '@prisma/client';
import type { TrainingsState } from './types';
import { INITIAL_TRAININGS_STATE, TRAININGS_STORE_NAME } from './const';
import { RequestStatus } from '~/shared/lib/const';
import type {
  CreateUserTrainingResponse,
  CreateUserTrainingRequestBody,
  GetUserTrainingsResponse
} from '~/server/api/trainings/types';
import { request } from '~/shared/api';
import { createRequestState } from '~/shared/lib/utils';
import type {
  CreateTrainingSetRequestBody,
  CreateTrainingSetResponse,
  GetTrainingSetsRequestParams,
  GetTrainingSetsResponse
} from '~/server/api/trainings/sets/types';

export const useTrainingStore = defineStore(TRAININGS_STORE_NAME, () => {
  const createTrainingRequest = createRequestState<Training>();
  const getTrainingByIdRequest = createRequestState<Training>();
  const getTrainingsRequest = createRequestState<Training[]>();
  const createTrainingSetRequest = createRequestState<TrainingSet>();
  const getTrainingSetsRequest = createRequestState<TrainingSet[]>();
  const state = reactive<TrainingsState>({ ...INITIAL_TRAININGS_STATE });

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
      const { data } = await request<CreateUserTrainingResponse, CreateUserTrainingRequestBody>(
        '/api/trainings',
        {
          method: 'POST',
          data: payload
        }
      );

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

      state.currentTrainings[trainingId] = data;

      return data;
    } catch (error) {
      getTrainingByIdRequest.status = RequestStatus.FAILED;
      getTrainingByIdRequest.error = error;

      return null;
    }
  };

  const createTrainingSet = async (
    payload: CreateTrainingSetRequestBody
  ): Promise<CreateTrainingSetResponse | null> => {
    createTrainingSetRequest.status = RequestStatus.PENDING;
    createTrainingSetRequest.error = null;

    try {
      const { data } = await request<CreateTrainingSetResponse, CreateTrainingSetRequestBody>(
        `/api/trainings/sets`,
        {
          method: 'POST',
          data: payload
        }
      );

      const currentTrainingSets = state.currentTrainingSets[payload.trainingId] || [];
      state.currentTrainingSets[payload.trainingId] = [...currentTrainingSets, data];

      createTrainingSetRequest.status = RequestStatus.SUCCESS;
      createTrainingSetRequest.data = data;

      return data;
    } catch (error) {
      createTrainingSetRequest.status = RequestStatus.FAILED;
      createTrainingSetRequest.error = error;

      return null;
    }
  };

  const getTrainingSets = async (
    params: GetTrainingSetsRequestParams
  ): Promise<GetTrainingSetsResponse | null> => {
    getTrainingSetsRequest.status = RequestStatus.PENDING;
    getTrainingSetsRequest.error = null;

    try {
      const { data } = await request<GetTrainingSetsResponse>(`/api/trainings/sets`, {
        method: 'GET',
        params
      });

      state.currentTrainingSets[params.trainingId] = data;

      getTrainingSetsRequest.status = RequestStatus.SUCCESS;
      getTrainingSetsRequest.data = data;

      return data;
    } catch (error) {
      getTrainingSetsRequest.status = RequestStatus.FAILED;
      getTrainingSetsRequest.error = error;

      return null;
    }
  };

  return {
    state,
    requests: computed(() => ({
      createTraining: createTrainingRequest,
      getTrainings: getTrainingsRequest,
      getTrainingById: getTrainingByIdRequest,
      createTrainingSet: createTrainingSetRequest,
      getTrainingSets: getTrainingSetsRequest
    })),
    actions: {
      createTraining,
      getTrainings,
      getTrainingById,
      createTrainingSet,
      getTrainingSets
    }
  };
});
