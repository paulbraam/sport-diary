import type { TrainingExerciseWithCatalogExerciseAndSets } from '~/server/api/trainings/exercises/types';

export interface DeleteTrainingExerciseCardButtonProps {
  trainingExerciseId: TrainingExerciseWithCatalogExerciseAndSets['id'];
}
