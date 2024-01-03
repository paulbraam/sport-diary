import { RequestStatus } from '~/constants/api';

export const createRequestState = () => {
  return reactive<{
    status: RequestStatus;
    error: unknown;
  }>({
    status: RequestStatus.IDLE,
    error: null
  });
};
