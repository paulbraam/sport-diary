import type { CreateTrainingExerciseRequestBody } from '~/server/api/trainings/exercises/types';

export type SubmitPayload = CreateTrainingExerciseRequestBody;

export type SubmitEventHandler = (data: SubmitPayload) => void;

export interface CreateTrainingExerciseSubmitButtonEmits {
  (eventName: 'onSubmitRegister', data: SubmitEventHandler): void;
}
