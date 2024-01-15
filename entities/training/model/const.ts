import type { TrainingsState } from './types';
import type { Nullable } from '~/types/common';

export const INITIAL_TRAININGS_STATE: Nullable<TrainingsState> = {
  trainings: [],
  currentTraining: null
};

export const TRAININGS_STORE_NAME = 'trainings';
