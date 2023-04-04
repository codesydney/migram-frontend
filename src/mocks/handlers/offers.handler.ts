import { rest } from "msw";
import { getOffersUrl } from "@Tasks/common/api";

export const getOffers = rest.get(getOffersUrl, async (req, res, ctx) => {
  const serverResponse = {
    status: "success",
    results: 16,
    data: {
      offers: [
        {
          status: "completed",
          _id: "1",
          offerAmt: 195,
          comments: "waerawerawerw123123123123123",
          providerId: "acct_1Lur4rIWxYvLVjGY",
          task: "Task1",
          createdAt: "2022-10-31T23:58:07.185Z",
          updatedAt: "2022-11-06T09:28:04.710Z",
          __v: 0,
          timeElapsed: "121 days ago",
          id: "1",
        },
        {
          status: "completed",
          _id: "2",
          offerAmt: 195,
          comments: "waerawerawerw123123123123123",
          providerId: "acct_1Lur4rIWxYvLVjGY",
          task: "Task2",
          createdAt: "2022-10-31T23:58:07.185Z",
          updatedAt: "2022-11-06T09:28:04.710Z",
          __v: 0,
          timeElapsed: "121 days ago",
          id: "2",
        },
      ],
    },
  };

  return res(ctx.status(200), ctx.json(serverResponse));
});
