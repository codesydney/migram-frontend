import { AxiosResponse } from "axios";
import { ApiResponse } from "./types";

export function createApiResponse(
  result: AxiosResponse,
  successMessage: string
): ApiResponse<any> {
  const isError = result.status !== 200;

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
