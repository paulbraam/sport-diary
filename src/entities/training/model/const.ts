import type { TrainingsState } from './types';

export const INITIAL_TRAININGS_STATE: TrainingsState = {
  trainings: new Map(),
  trainingExercises: new Map()
};

export const TRAININGS_STORE_NAME = 'trainings';

export const TRAINING_EXERCISE_FORM_ID = 'training-exercise-form';

export const TRAINING_SET_FORM_ID = 'training-set-form';
