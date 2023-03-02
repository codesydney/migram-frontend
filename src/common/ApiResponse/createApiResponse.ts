import { v4 as uuid } from "uuid";
import { AxiosResponse } from "axios";

import { ApiResponse } from "./types";
import { isErrorStatusCode } from "./utils";

export type CreateApiResponseOptions = { message: string; id?: string };

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
