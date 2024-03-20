import type { TrainingsState } from './types';

// STORE

export const INITIAL_TRAININGS_STATE: TrainingsState = {
  trainings: new Map(),
  trainingExercises: new Map()
};

export const TRAININGS_STORE_NAME = 'trainings';

// FORMS

export const TRAINING_EXERCISE_FORM_ID = 'training-exercise-form';

export const TRAINING_SET_FORM_ID = 'training-set-form';

// MODALS

export const CREATE_TRAINING_EXERCISE_MODAL_ID = 'create-training-exercise-modal';

export enum CreateTrainingExerciseModalRoles {
  APPLY = 'APPLY',
  CLOSE = 'CLOSE'
}

export const CREATE_TRAINING_SET_MODAL_ID = 'create-training-set-modal';

export enum CreateTrainingSetModalRoles {
  APPLY = 'APPLY',
  CLOSE = 'CLOSE'
}
