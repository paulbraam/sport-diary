export type RequestEvent = Parameters<typeof parseCookies>[0];

export interface ParsedAuthCookie {
  userId: string;
}
