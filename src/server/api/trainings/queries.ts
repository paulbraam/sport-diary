import { type Training } from '@prisma/client';
import { type CreateUserTrainingData } from './types';
import { prisma } from '~/server/db';

export const getTrainingsByUserId = (userId: string): Promise<Training[]> => {
  return prisma.training.findMany({
    where: {
      userId
    },
    orderBy: {
      startedAt: 'desc'
    }
  });
};

export const createTrainingByUserId = (
  data: CreateUserTrainingData,
  userId: string
): Promise<Training> => {
  return prisma.training.create({
    data: {
      ...data,
      User: {
        connect: {
          id: userId
        }
      }
    }
  });
};
