import { v4 as uuid } from "uuid";
import { AxiosResponse } from "axios";

import { Notification } from "./types";
import { isErrorStatusCode } from "./utils";

export type CreateApiResponseOptions = { message: string; id?: string };

export type ApiResponse<TData> = {
  apiEvent: Notification;
  data?: TData;
};

export function createApiResponse(
  result: AxiosResponse,
  options: CreateApiResponseOptions
): ApiResponse<any> {
  const isError = isErrorStatusCode(result.status);

  return {
    apiEvent: {
      id: options?.id || uuid(),
      isError,
      level: "error",
      title: options.message,
      status: result.status,
      statusText: result.statusText,
    },
    data: isError ? undefined : result.data,
  };
}

export type createDefaultApiErrorEventOptions = CreateApiResponseOptions;

export function createDefaultApiErrorEvent(
  options: createDefaultApiErrorEventOptions
) {
  return {
    id: options?.id || uuid(),
    isError: true,
    title: options.message,
    status: 500,
    statusText: "Internal Server Error",
    level: "error",
  } as const;
}
