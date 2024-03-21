import type { TrainingExerciseWithCatalogExerciseAndSets } from '~/server/api/trainings/exercises/types';

export interface AddTrainingSetButtonProps {
  trainingExerciseId: TrainingExerciseWithCatalogExerciseAndSets['id'];
}
