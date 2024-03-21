import type { TrainingExerciseWithCatalogExerciseAndSets } from '~/server/api/trainings/exercises/types';
import type { TrainingSetPayload } from '~/server/api/trainings/sets/types';

export interface CreateTrainingSetModalProps {
  trainingExerciseId: TrainingExerciseWithCatalogExerciseAndSets['id'];
}

export type SubmitEventHandler = (data: TrainingSetPayload) => void;
