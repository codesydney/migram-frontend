export type CreateGetTaskResponseProps = {
  paymentStatus?: string;
};

export function createGetTaskResponse(
  options: CreateGetTaskResponseProps = {}
) {
  return {
    status: "success",
    data: {
      task: {
        location: { type: "Point", name: "2000", coordinates: [0, 0] },
        status: "open",
        paymentStatus: options?.paymentStatus,
        photos: [""],
        _id: "6350d8e080c58772355d7645",
        category: "Cleaning",
        title: "Placeholder",
        details: "asdfasdfasdfTest for provider",
        dueDate: "2023-01-06T00:00:00.000Z",
        budget: 200,
        timeEstimate: "1-3hrs",
        timeOfArrival: "7am-10am",
        customerId: "cus_Me9Lz7memmLIEB",
        createdAt: "2022-10-20T05:13:04.572Z",
        updatedAt: "2022-10-20T05:13:04.572Z",
        __v: 0,
        timeElapsed: "133 days ago",
        id: "6350d8e080c58772355d7645",
        offers: [
          {
            firstName: "qwe",
            photo:
              "https://res.cloudinary.com/dxd5elnem/image/upload/c_thumb,w_200,g_face/v1633225891/users/blank-profile.png",
            status: "completed",
            _id: "63677e0114fc3b6d490feebb",
            offerAmt: 2000,
            comments: "123123123123123123123123123123",
            providerId: "acct_1Lur4rIWxYvLVjGY",
            task: "6350d8e080c58772355d7645",
            createdAt: "2022-11-06T09:27:29.283Z",
            updatedAt: "2023-01-17T09:44:36.085Z",
            __v: 0,
            timeElapsed: "116 days ago",
            id: "63677e0114fc3b6d490feebb",
          },
          {
            firstName: "qwe",
            photo:
              "https://res.cloudinary.com/dxd5elnem/image/upload/c_thumb,w_200,g_face/v1633225891/users/blank-profile.png",
            status: "outbidded",
            _id: "6368eaf5b3fe7465889dff57",
            offerAmt: 123123,
            comments: "123123123123123123123123123123",
            providerId: "acct_1Lur4rIWxYvLVjGY",
            task: "6350d8e080c58772355d7645",
            createdAt: "2022-11-07T11:24:37.742Z",
            updatedAt: "2023-01-17T09:40:16.351Z",
            __v: 0,
            timeElapsed: "115 days ago",
            id: "6368eaf5b3fe7465889dff57",
          },
        ],
        numOfOffers: 2,
      },
    },
  };
}
