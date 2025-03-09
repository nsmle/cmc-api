import type { Iso8601, UnixEpoch } from "@option/common.option";

export const dateToUnix = (date: Date): UnixEpoch | null => (date ? Math.floor(date.getTime() / 1000) : null);
export const unixToDate = (unix: UnixEpoch): Date | null => (unix ? new Date(unix * 1000) : null);
export const dateToIso8601 = (date: Date): Iso8601 => date.toISOString();
export const iso8601ToDate = (iso8601: Iso8601): Date => new Date(iso8601);
export const nowUnix = (): UnixEpoch => Math.floor(Date.now() / 1000);
export const nowIso8601 = (): Iso8601 => new Date().toISOString();
