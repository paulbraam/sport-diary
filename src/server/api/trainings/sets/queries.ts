import { CreateTrainingSetRequestBody } from './types';
import { prisma } from '~/server/db';

export const createTrainingSet = (payload: CreateTrainingSetRequestBody) => {
  const { exerciseId, trainingId } = payload;
  return prisma.trainingSet.create({
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

export const getTrainingSetsByTrainingId = (trainingId: string) => {
  return prisma.trainingSet.findMany({
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
