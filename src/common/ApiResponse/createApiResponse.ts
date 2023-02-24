import { AxiosResponse } from "axios";

import { ApiResponse } from "./types";
import { isErrorStatusCode } from "./utils";

export function createApiResponse(
  result: AxiosResponse,
  successMessage: string
): ApiResponse<any> {
  const isError = isErrorStatusCode(result.status);

  return {
    apiEvent: {
      isError,
      title: isError ? result.data.message : successMessage,
      status: result.status,
      statusText: result.statusText,
    },
    data: isError ? undefined : result.data,
  };
}
