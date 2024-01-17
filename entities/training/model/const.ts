import type { TrainingsState } from './types';
import type { Nullable } from '~/shared/lib/types';

export const INITIAL_TRAININGS_STATE: Nullable<TrainingsState> = {
  trainings: [],
  currentTraining: null
};

export const TRAININGS_STORE_NAME = 'trainings';
