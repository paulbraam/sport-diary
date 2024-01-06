import { protectRoute } from '~/server/utils';

export default defineEventHandler((event) => {
  assertMethod(event, ['GET']);

  protectRoute(event);

  return [];
});
