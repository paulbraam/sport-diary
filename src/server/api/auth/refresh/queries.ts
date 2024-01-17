import { type Account, type User } from '@prisma/client';
import { prisma } from '~/server/db';

export const getAccountAndUserByProviderAccountId = async (
  providerAccountId: string
): Promise<{ account: Account; user: User }> => {
  const currentAccount = await prisma.account.findFirst({
    where: {
      providerAccountId
    },
    include: {
      user: true
    }
  });

  if (!currentAccount) {
    throw createError({
      statusCode: 404,
      statusText: 'No account found'
    });
  }

  const { user, ...account } = currentAccount;

  return {
    user,
    account
  };
};
