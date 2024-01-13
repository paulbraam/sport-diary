import type { HttpOptions } from '@capacitor/core';

export enum RequestStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export const DEFAULT_REQUEST_HEADERS: HttpOptions['headers'] = {
  'Content-Type': 'application/json'
};
