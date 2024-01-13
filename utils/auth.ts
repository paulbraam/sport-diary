import { Preferences } from '@capacitor/preferences';
import type { Authentication } from '@codetrix-studio/capacitor-google-auth';
import { AUTH_STORAGE_KEY } from '~/constants/auth';

export class AuthStorage {
  static setAuth = async (auth: Authentication) => {
    await Preferences.set({
      key: AUTH_STORAGE_KEY,
      value: JSON.stringify(auth)
    });
  };

  static getAuth = async (): Promise<Authentication | null> => {
    const result = await Preferences.get({ key: AUTH_STORAGE_KEY });
    return result.value && JSON.parse(result.value);
  };

  static clearAuth = async () => {
    await Preferences.remove({ key: AUTH_STORAGE_KEY });
  };
}
