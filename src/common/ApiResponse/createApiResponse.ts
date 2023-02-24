import { AxiosResponse } from "axios";
import { ApiResponse } from "./types";

export function createApiResponse(result: AxiosResponse): ApiResponse<any> {
  return {
    apiEvent: {
      isError: result.status !== 200,
      title: result.data.message,
      status: result.status,
      statusText: result.statusText,
    },
    data: undefined,
  };
}
