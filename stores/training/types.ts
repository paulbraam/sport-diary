import type { Training } from '@prisma/client';

export interface TrainingsState {
  trainings: Training[];
  currentTraining: Training;
}
