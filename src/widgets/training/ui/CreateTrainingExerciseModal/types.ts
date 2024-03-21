import type { Training } from '@prisma/client';
import type { CreateTrainingExerciseRequestBody } from '~/server/api/trainings/exercises/types';

export interface CreateTrainingExerciseModalProps {
  trainingId: Training['id'];
}

export type SubmitEventHandler = (data: CreateTrainingExerciseRequestBody) => void;
