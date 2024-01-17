import { type SignInRequest } from './types';
import { createOrRegisterUserAndAccount } from './queries';

export default defineEventHandler<SignInRequest>(async (event) => {
  assertMethod(event, ['POST']);

  const payload = await readBody(event);

  return createOrRegisterUserAndAccount(payload);
});
