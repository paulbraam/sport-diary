import { getUser } from '../utils';

export default defineEventHandler(async (event) => {
  event.context.user = await getUser(event);
});
