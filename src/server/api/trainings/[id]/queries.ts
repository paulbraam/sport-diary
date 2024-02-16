import { Training } from '@prisma/client';
import { prisma } from '~/server/db';

export const getTrainingById = async (id: string): Promise<Training> => {
  const training = await prisma.training.findFirst({
    where: {
      id
    }
  });

  if (!training) {
    throw createError({
      statusCode: 404,
      statusText: 'Training not found'
    });
  }

  return training;
};

export const deleteTrainingById = (id: string): Promise<Training> => {
  return prisma.training.delete({
    where: {
      id
    }
  });
};
