import { User } from '@prisma/client';
import { prisma } from './db';

export const getUserByProviderAccountId = async (
  providerAccountId: string
): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      accounts: {
        some: {
          providerAccountId
        }
      }
    }
  });
};
