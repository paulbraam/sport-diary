import type { TrainingsState } from './types';
import type { NullableObjectValues } from '~/shared/lib/types';

export const INITIAL_TRAININGS_STATE: NullableObjectValues<TrainingsState> = {
  trainings: [],
  currentTraining: null
};

export const TRAININGS_STORE_NAME = 'trainings';
