import type { UserSettingsState } from './types';

export const USER_SETTINGS_STORE_NAME = 'user_settings';

export const USER_SETTINGS_INITIAL_STATE: UserSettingsState = {
  settings: {
    exercises: []
  }
};
