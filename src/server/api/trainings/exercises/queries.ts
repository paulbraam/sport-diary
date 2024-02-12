import { CreateTrainingExerciseRequestBody } from './types';
import { prisma } from '~/server/db';

export const createTrainingExercise = (payload: CreateTrainingExerciseRequestBody) => {
  const { exerciseId, trainingId } = payload;
  return prisma.trainingExercise.create({
    data: {
      exercise: {
        connect: {
          id: exerciseId
        }
      },
      Training: {
        connect: {
          id: trainingId
        }
      }
    },
    include: {
      exercise: true
    }
  });
};

export const getTrainingExercisesByTrainingId = (trainingId: string) => {
  return prisma.trainingExercise.findMany({
    where: {
      Training: {
        id: trainingId
      }
    },
    include: {
      exercise: true
    }
  });
};
