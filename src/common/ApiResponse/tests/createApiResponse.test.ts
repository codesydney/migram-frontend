import { AxiosResponse } from "axios";
import { createApiResponse } from "../createApiResponse";
import { ApiResponse } from "../types";

type AxiosTableTestCases = {
  name: string;
  input: AxiosResponse;
  expected: ApiResponse<any>;
}[];

const axiosTestCases: AxiosTableTestCases = [
  {
    name: "handles 401 Unauthorized Axios Error Response",
    input: {
      data: {
        status: "error",
        message: "Invalid Token: please log in again.",
      },
      status: 401,
      statusText: "Unauthorized",
      headers: {},
      config: {},
    },
    expected: {
      apiEvent: {
        isError: true,
        title: "Invalid Token: please log in again.",
        status: 401,
        statusText: "Unauthorized",
      },
      data: undefined,
    },
  },
  {
    name: "handles 500 Internal Server Error Axios Response",
    input: {
      data: {
        status: "error",
        message: "Invalid Task",
      },
      status: 500,
      statusText: "Internal Server Error",
      headers: {},
      config: {},
    },
    expected: {
      apiEvent: {
        isError: true,
        title: "Invalid Task",
        status: 500,
        statusText: "Internal Server Error",
      },
      data: undefined,
    },
  },
];

it.each(axiosTestCases)("$name", ({ name, input, expected }) => {
  const actual = createApiResponse(input);

  expect(actual).toEqual(expected);
});
