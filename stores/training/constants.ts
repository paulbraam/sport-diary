import type { TrainingsState } from './types';
import type { Nullable } from '~/types/common';

export enum AuthProvider {
  GOOGLE = 'google'
}

export const INITIAL_TRAININGS_STATE: Nullable<TrainingsState> = {
  trainings: [],
  currentTraining: null
};

export const TRAININGS_STORE_NAME = 'trainings';
