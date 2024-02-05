import { deleteUserExercise } from './queries';
import { DeleteUserExerciseResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler((event): Promise<DeleteUserExerciseResponse> => {
  protectRoute(event);

  const exerciseId = event.context.params?.id;

  if (!exerciseId) {
    throw createError({ statusCode: 404, statusText: 'No exercise id found' });
  }

  return deleteUserExercise(event.context.user.id, exerciseId);
});
