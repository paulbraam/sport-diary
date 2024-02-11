import type { TrainingsState } from './types';

export const INITIAL_TRAININGS_STATE: TrainingsState = {
  trainings: [],
  currentTrainings: {},
  currentTrainingSets: {}
};

export const TRAININGS_STORE_NAME = 'trainings';

export const TRAINING_SET_FORM_ID = 'training-set-form';
