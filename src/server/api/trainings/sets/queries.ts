import { CreateTrainingSetRequestBody } from './types';
import { prisma } from '~/server/db';

export const createTrainingSet = (payload: CreateTrainingSetRequestBody) => {
  const { trainingExerciseId, data } = payload;
  return prisma.trainingSet.create({
    data: {
      ...data,
      TrainingExercise: {
        connect: {
          id: trainingExerciseId
        }
      }
    }
  });
};
