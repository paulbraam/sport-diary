import {
  type CreateOrRegisterUserAndAccountReturnType,
  type CreateOrRegisterUserAndAccountParams
} from './types';
import { prisma } from '~/server/db';

export const createOrRegisterUserAndAccount = async (
  payload: CreateOrRegisterUserAndAccountParams
): Promise<CreateOrRegisterUserAndAccountReturnType> => {
  const currentAccount = await prisma.account.findFirst({
    where: {
      providerAccountId: payload.account.providerAccountId
    },
    include: {
      user: true
    }
  });

  if (currentAccount) {
    const { user, ...account } = currentAccount;

    return {
      user,
      account
    };
  }

  const newAccount = await prisma.account.create({
    data: {
      ...payload.account,
      user: {
        create: {
          ...payload.user,
          settings: {
            create: {
              exercises: {
                create: []
              }
            }
          }
        }
      }
    },
    include: {
      user: true
    }
  });

  const { user, ...account } = newAccount;

  return {
    user,
    account
  };
};
