import { getUserSettingsByUserId } from './queries';
import { GetUserSettingsResponse } from './types';
import { protectRoute } from '~/server/utils';

export default defineEventHandler(async (event): Promise<GetUserSettingsResponse> => {
  protectRoute(event);

  return await getUserSettingsByUserId(event.context.user.id);
});
