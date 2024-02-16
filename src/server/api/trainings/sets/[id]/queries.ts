import { TrainingSet } from '@prisma/client';
import { prisma } from '~/server/db';

export const deleteTrainingSetById = (id: string): Promise<TrainingSet> => {
  return prisma.trainingSet.delete({
    where: { id }
  });
};
