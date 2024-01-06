import { type Prisma, type Training } from '@prisma/client';
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
  data: Prisma.TrainingCreateInput,
  userId: string
): Promise<Training> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
