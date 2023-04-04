import { v4 as uuid } from "uuid";
import { Notification } from "./types";

export function isErrorStatusCode(statusCode: number) {
  const firstDigit = Math.trunc(statusCode / 100);
  return firstDigit === 4 || firstDigit === 5;
}

export type CreateNotificationOptions = Omit<Notification, "id"> & {
  id?: string;
};

export function createNotification(
  options: CreateNotificationOptions
): Notification {
  return {
    ...options,
    id: options?.id || uuid(),
  } as const;
}
