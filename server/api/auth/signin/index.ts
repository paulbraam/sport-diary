import { type SignInRequest } from './types';
import { createOrRegisterUserAndAccount } from './queries';

export default defineEventHandler<SignInRequest>(async (event) => {
  assertMethod(event, ['PUT', 'PATCH', 'POST']);

  const payload = await readBody(event);

  const { account, user } = await createOrRegisterUserAndAccount(payload);

  return {
    account,
    user
  };
});
