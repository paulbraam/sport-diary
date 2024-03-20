import type { CatalogExercise } from '@prisma/client';

export interface ApplyUserExercisesModalButtonProps {
  exerciseIds: Array<CatalogExercise['id']>;
}
