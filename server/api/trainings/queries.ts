import { type Training } from '@prisma/client';
import { type CreateUserTrainingData } from './types';
import { prisma } from '~/server/db';

export const getTrainingsByUserId = (userId: string): Promise<Training[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return prisma.training.findMany({
    where: {
      userId
    }
  });
};

export const createTrainingByUserId = (
  data: CreateUserTrainingData,
  userId: string
): Promise<Training> => {
  const { userParams, training } = data;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return prisma.training.create({
    data: {
      ...training,
      User: {
        connect: {
          id: userId
        }
      },
      userParams: {
        create: userParams
      }
    }
  });
};
