import { Training, TrainingStatus } from '@prisma/client';
import { prisma } from '~/server/db';

export const updateTrainingStatus = async (
  id: string,
  status: TrainingStatus
): Promise<Training> => {
  return await prisma.training.update({
    where: { id },
    data: {
      status
    }
  });
};
