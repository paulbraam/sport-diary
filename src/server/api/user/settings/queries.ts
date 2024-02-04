import { GetUserSettingsResponse } from './types';
import { prisma } from '~/server/db';

export const getUserSettingsByUserId = async (userId: string): Promise<GetUserSettingsResponse> => {
  const settings = await prisma.userSettings.findFirst({
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

  if (!settings) {
    throw createError({ statusCode: 404, statusText: 'Settings not found' });
  }

  return settings;
};
