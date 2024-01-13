import { getAuthCookie } from '../utils';

export default defineEventHandler((event) => {
  event.context.auth = getAuthCookie(event);
});
