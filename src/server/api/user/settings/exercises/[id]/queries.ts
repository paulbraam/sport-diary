import { prisma } from '~/server/db';

export const deleteUserExercise = async (userId: string, exerciseId: string) => {
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

  return await prisma.catalogExercise.update({
    where: {
      id: exerciseId
    },
    data: {
      UserSettings: {
        disconnect: {
          id: currentSettings.id
        }
      }
    }
  });
};
