import { deleteUserExercise } from './queries';
import { DeleteUserExerciseResponse } from './types';

export default defineEventHandler((event): Promise<DeleteUserExerciseResponse> => {
  const exerciseId = event.context.params?.id;

  if (!exerciseId) {
    throw createError({ statusCode: 404, statusText: 'No exercise id found' });
  }

  return deleteUserExercise(event.context.user.id, exerciseId);
});
