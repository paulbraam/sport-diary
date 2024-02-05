import { Prisma } from '@prisma/client';

export type UserSettingsWithExercises = Prisma.UserSettingsGetPayload<{
  include: {
    exercises: true;
  };
}>;

export type GetUserSettingsResponse = UserSettingsWithExercises;
