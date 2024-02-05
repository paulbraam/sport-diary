import { getUserSettingsByUserId } from './queries';
import { GetUserSettingsResponse } from './types';

export default defineEventHandler(async (event): Promise<GetUserSettingsResponse> => {
  return await getUserSettingsByUserId(event.context.user.id);
});
