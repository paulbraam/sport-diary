import { TrainingExerciseWithCatalogExerciseAndSets } from '../types';
import { prisma } from '~/server/db';

export const getTrainingExerciseById = async (
  id: string
): Promise<TrainingExerciseWithCatalogExerciseAndSets> => {
  const trainingExercise = await prisma.trainingExercise.findFirst({
    where: {
      id
    },
    include: {
      exercise: true,
      sets: true
    }
  });

  if (!trainingExercise) {
    throw createError({ statusCode: 404, statusText: 'No training exercise found' });
  }

  return trainingExercise;
};
