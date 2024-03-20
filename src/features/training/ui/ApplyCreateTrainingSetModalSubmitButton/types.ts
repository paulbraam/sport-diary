import type { TrainingExerciseWithCatalogExerciseAndSets } from '~/server/api/trainings/exercises/types';
import type { TrainingSetPayload } from '~/server/api/trainings/sets/types';

export type SubmitEventHandler = (data: TrainingSetPayload) => void;

export type ApplyCreateTrainingSetModalSubmitButtonEmits = {
  (eventName: 'onSubmitRegister', onSubmitted: SubmitEventHandler): void;
};

export interface ApplyCreateTrainingSetModalSubmitButtonProps {
  trainingExerciseId: TrainingExerciseWithCatalogExerciseAndSets['id'];
}
