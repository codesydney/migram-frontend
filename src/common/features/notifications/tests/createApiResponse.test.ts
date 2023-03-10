import { AxiosResponse } from "axios";
import { ApiResponse, createApiResponse } from "../createApiResponse";

type AxiosTableTestCases = {
  name: string;
  input: AxiosResponse;
  message: string;
  expected: ApiResponse<any>;
}[];

const Axios200Response_GetOffersList: AxiosResponse = {
  data: {
    status: "success",
    results: 1,
    data: {
      offers: [
        {
          status: "completed",
          _id: "6360610f5fac2e5082d00912",
          offerAmt: 195,
          comments: "waerawerawerw123123123123123",
          providerId: "acct_1Lur4rIWxYvLVjGY",
          task: "636060fa5fac2e5082d00903",
          createdAt: "2022-10-31T23:58:07.185Z",
          updatedAt: "2022-11-06T09:28:04.710Z",
          __v: 0,
          timeElapsed: "115 days ago",
          id: "6360610f5fac2e5082d00912",
        },
      ],
    },
  },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

const Axios201Response_CreateOffer: AxiosResponse = {
  data: {
    status: "success",
    data: {
      task: {
        status: "open",
        _id: "63f860b4250a0e93b760ef69",
        offerAmt: 200,
        comments: "Testing because I want the Axios Response",
        providerId: "acct_1Lur4rIWxYvLVjGY",
        task: "6350d7bc80c58772355d7625",
        createdAt: "2023-02-24T07:01:08.013Z",
        updatedAt: "2023-02-24T07:01:08.013Z",
        __v: 0,
        timeElapsed: "0 secs ago",
        id: "63f860b4250a0e93b760ef69",
      },
    },
  },
  status: 201,
  statusText: "Created",
  headers: {},
  config: {},
};

const Axios401Response: AxiosResponse = {
  data: {
    status: "error",
    message: "Invalid Token: please log in again.",
  },
  status: 401,
  statusText: "Unauthorized",
  headers: {},
  config: {},
};

const Axios500Response: AxiosResponse = {
  data: {
    status: "error",
    message: "Invalid Task",
  },
  status: 500,
  statusText: "Internal Server Error",
  headers: {},
  config: {},
};

const axiosTestCases: AxiosTableTestCases = [
  {
    name: "handles 200 OK Axios Response",
    input: Axios200Response_GetOffersList,
    message: "Successfully loaded Offers list.",
    expected: {
      apiEvent: {
        id: "1",
        level: "error",
        isError: false,
        title: "Successfully loaded Offers list.",
        status: 200,
        statusText: "OK",
      },
      data: {
        status: "success",
        results: 1,
        data: {
          offers: [
            {
              status: "completed",
              _id: "6360610f5fac2e5082d00912",
              offerAmt: 195,
              comments: "waerawerawerw123123123123123",
              providerId: "acct_1Lur4rIWxYvLVjGY",
              task: "636060fa5fac2e5082d00903",
              createdAt: "2022-10-31T23:58:07.185Z",
              updatedAt: "2022-11-06T09:28:04.710Z",
              __v: 0,
              timeElapsed: "115 days ago",
              id: "6360610f5fac2e5082d00912",
            },
          ],
        },
      },
    },
  },
  {
    name: "handles 201 Created Axios Response",
    input: Axios201Response_CreateOffer,
    message: "Successfully created Offer.",
    expected: {
      apiEvent: {
        id: "1",
        level: "error",
        isError: false,
        title: "Successfully created Offer.",
        status: 201,
        statusText: "Created",
      },
      data: {
        data: {
          task: {
            status: "open",
            _id: "63f860b4250a0e93b760ef69",
            offerAmt: 200,
            comments: "Testing because I want the Axios Response",
            providerId: "acct_1Lur4rIWxYvLVjGY",
            task: "6350d7bc80c58772355d7625",
            createdAt: "2023-02-24T07:01:08.013Z",
            updatedAt: "2023-02-24T07:01:08.013Z",
            __v: 0,
            timeElapsed: "0 secs ago",
            id: "63f860b4250a0e93b760ef69",
          },
        },
        status: "success",
      },
    },
  },
  {
    name: "handles 401 Unauthorized Axios Error Response",
    input: Axios401Response,
    message: "Invalid Token: please log in again.",
    expected: {
      apiEvent: {
        id: "1",
        level: "error",
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
    input: Axios500Response,
    message: "Invalid Task",
    expected: {
      apiEvent: {
        id: "1",
        level: "error",
        isError: true,
        title: "Invalid Task",
        status: 500,
        statusText: "Internal Server Error",
      },
      data: undefined,
    },
  },
];

it.each(axiosTestCases)("$name", ({ input, message, expected }) => {
  const actual = createApiResponse(input, {
    message,
    id: "1",
  });

  expect(actual).toMatchObject(expected);
});
