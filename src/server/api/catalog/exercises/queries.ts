import { CatalogExercise } from '@prisma/client';
import { GetCatalogExercisesQueryParams } from './types';
import { DEFAULT_EXERCISES_LIMIT } from './const';
import { prisma } from '~/server/db';

export const getCatalogExercises = ({
  limit,
  muscle,
  equipment,
  category,
  force,
  contains
}: GetCatalogExercisesQueryParams): Promise<CatalogExercise[]> => {
  return prisma.catalogExercise.findMany({
    take: limit ? Number(limit) : DEFAULT_EXERCISES_LIMIT,
    where: {
      primaryMuscles: muscle ? { equals: [muscle] } : undefined,
      equipment: equipment || undefined,
      category: category || undefined,
      force: force || undefined,
      name: {
        contains,
        mode: 'insensitive'
      }
    }
  });
};
