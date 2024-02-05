import { CatalogExercise } from '@prisma/client';
import { prisma } from '~/server/db';

export const updateUserExercises = async (
  userId: string,
  exerciseIds: string[]
): Promise<CatalogExercise[]> => {
  const currentSettings = await prisma.userSettings.findFirst({
    where: {
      User: {
        some: {
          id: userId
        }
      }
    },
    include: {
      exercises: true
    }
  });

  if (!currentSettings) {
    throw createError({ statusCode: 404, statusText: 'userSettings not found' });
  }

  await prisma.$transaction(async (ctx) => {
    for (const exercise of currentSettings.exercises) {
      if (exerciseIds.includes(exercise.id)) {
        exerciseIds = exerciseIds.filter((id) => id !== exercise.id);
      } else {
        await ctx.catalogExercise.update({
          where: {
            id: exercise.id
          },
          data: {
            UserSettings: {
              disconnect: {
                id: currentSettings.id
              }
            }
          }
        });
      }
    }

    for (const id of exerciseIds) {
      await ctx.catalogExercise.update({
        where: {
          id
        },
        data: {
          UserSettings: {
            connect: {
              id: currentSettings.id
            }
          }
        }
      });
    }
  });

  const settings = await prisma.userSettings.findFirst({
    where: {
      id: currentSettings.id
    },
    include: {
      exercises: true
    }
  });

  return settings?.exercises ?? [];
};
