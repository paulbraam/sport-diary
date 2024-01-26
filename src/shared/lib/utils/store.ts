import { RequestStatus } from '~/shared/lib/const';

export const createRequestState = <T>() => {
  return reactive<{
    status: RequestStatus;
    error: Error | null;
    data: T | null;
  }>({
    status: RequestStatus.IDLE,
    error: null,
    data: null
  });
};
