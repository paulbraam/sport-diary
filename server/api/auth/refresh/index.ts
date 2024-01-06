import { jwtDecode } from 'jwt-decode';
import { type RefreshRequest } from './types';
import { getAccountAndUserByProviderAccountId } from './queries';

export default defineEventHandler<RefreshRequest>(async (event) => {
  assertMethod(event, ['POST']);

  const { idToken } = await readBody(event);

  const { sub: providerAccountId } = jwtDecode(idToken);

  if (!providerAccountId) {
    throw createError({
      status: 404,
      statusText: 'providerAccountId not found'
    });
  }

  return getAccountAndUserByProviderAccountId(providerAccountId);
});
