import { defineStore } from 'pinia';
import { type TrainingSet, type Training } from '@prisma/client';
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
  CreateTrainingExerciseRequestBody,
  CreateTrainingExerciseResponse,
  GetTrainingExercisesRequestParams,
  GetTrainingExercisesResponse,
  TrainingExerciseWithCatalogExerciseAndSets
} from '~/server/api/trainings/exercises/types';
import type {
  CreateTrainingSetRequestBody,
  CreateTrainingSetResponse
} from '~/server/api/trainings/sets/types';
import type { GetTrainingExerciseResponse } from '~/server/api/trainings/exercises/[id]/types';

export const useTrainingStore = defineStore(TRAININGS_STORE_NAME, () => {
  const createTrainingRequest = createRequestState<Training>();
  const getTrainingByIdRequest = createRequestState<Training>();
  const getTrainingsRequest = createRequestState<Training[]>();
  const createTrainingExerciseRequest =
    createRequestState<TrainingExerciseWithCatalogExerciseAndSets>();
  const getTrainingExercisesRequest =
    createRequestState<TrainingExerciseWithCatalogExerciseAndSets[]>();
  const getTrainingExerciseByIdRequest =
    createRequestState<TrainingExerciseWithCatalogExerciseAndSets>();
  const createTrainingSetRequest = createRequestState<TrainingSet>();
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

  const createTrainingExercise = async (
    payload: CreateTrainingExerciseRequestBody
  ): Promise<CreateTrainingExerciseResponse | null> => {
    createTrainingExerciseRequest.status = RequestStatus.PENDING;
    createTrainingExerciseRequest.error = null;

    try {
      const { data } = await request<
        CreateTrainingExerciseResponse,
        CreateTrainingExerciseRequestBody
      >(`/api/trainings/exercises`, {
        method: 'POST',
        data: payload
      });

      const currentTrainingExercises = state.currentTrainingExercises[payload.trainingId] || [];
      state.currentTrainingExercises[payload.trainingId] = [...currentTrainingExercises, data];

      createTrainingExerciseRequest.status = RequestStatus.SUCCESS;
      createTrainingExerciseRequest.data = data;

      return data;
    } catch (error) {
      createTrainingExerciseRequest.status = RequestStatus.FAILED;
      createTrainingExerciseRequest.error = error;

      return null;
    }
  };

  const getTrainingExercises = async (
    params: GetTrainingExercisesRequestParams
  ): Promise<GetTrainingExercisesResponse | null> => {
    getTrainingExercisesRequest.status = RequestStatus.PENDING;
    getTrainingExercisesRequest.error = null;

    try {
      const { data } = await request<GetTrainingExercisesResponse>(`/api/trainings/exercises`, {
        method: 'GET',
        params
      });

      state.currentTrainingExercises[params.trainingId] = data;

      getTrainingExercisesRequest.status = RequestStatus.SUCCESS;
      getTrainingExercisesRequest.data = data;

      return data;
    } catch (error) {
      getTrainingExercisesRequest.status = RequestStatus.FAILED;
      getTrainingExercisesRequest.error = error;

      return null;
    }
  };

  const getTrainingExerciseById = async (
    exerciseId: string
  ): Promise<GetTrainingExerciseResponse | null> => {
    getTrainingExerciseByIdRequest.status = RequestStatus.PENDING;
    getTrainingExerciseByIdRequest.error = null;

    try {
      const { data } = await request<GetTrainingExerciseResponse>(
        `/api/trainings/exercises/${exerciseId}`,
        {
          method: 'GET'
        }
      );

      const trainingId = data.trainingId;

      if (trainingId) {
        const currentTrainingExercises = state.currentTrainingExercises[trainingId] || [];
        const filteredExercisesList = currentTrainingExercises.filter(
          (item) => item.id !== data.id
        );
        state.currentTrainingExercises[trainingId] = [...filteredExercisesList, data];
      }

      getTrainingExerciseByIdRequest.status = RequestStatus.SUCCESS;
      getTrainingExerciseByIdRequest.data = data;

      return data;
    } catch (error) {
      getTrainingExerciseByIdRequest.status = RequestStatus.FAILED;
      getTrainingExerciseByIdRequest.error = error;

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

      createTrainingSetRequest.status = RequestStatus.SUCCESS;
      createTrainingSetRequest.data = data;

      return data;
    } catch (error) {
      createTrainingSetRequest.status = RequestStatus.FAILED;
      createTrainingSetRequest.error = error;

      return null;
    }
  };

  return {
    state,
    requests: computed(() => ({
      createTraining: createTrainingRequest,
      getTrainings: getTrainingsRequest,
      getTrainingById: getTrainingByIdRequest,
      createTrainingExercise: createTrainingExerciseRequest,
      getTrainingExercises: getTrainingExercisesRequest,
      createTrainingSet: createTrainingSetRequest,
      getTrainingExerciseById: getTrainingExerciseByIdRequest
    })),
    actions: {
      createTraining,
      getTrainings,
      getTrainingById,
      createTrainingExercise,
      getTrainingExercises,
      createTrainingSet,
      getTrainingExerciseById
    }
  };
});
