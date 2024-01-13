import { RequestStatus } from '~/constants/api';

export const createRequestState = <T>() => {
  return reactive<{
    status: RequestStatus;
    error: unknown;
    data: T | null;
  }>({
    status: RequestStatus.IDLE,
    error: null,
    data: null
  });
};
