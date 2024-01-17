import type { Account, User } from '@prisma/client';
import type { JwtPayload } from 'jwt-decode';

export interface AuthState {
  user: User;
  account: Account;
}

export interface GoogleAuthJwtToken extends JwtPayload {
  email_verified: boolean;
}
