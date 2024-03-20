import type { Training } from '@prisma/client';
import type { TrainingExerciseWithCatalogExerciseAndSets } from '~/server/api/trainings/exercises/types';

// store

export interface TrainingsState {
  trainings: Map<Training['id'], Training>;
  trainingExercises: Map<
    TrainingExerciseWithCatalogExerciseAndSets['id'],
    TrainingExerciseWithCatalogExerciseAndSets
  >;
}
