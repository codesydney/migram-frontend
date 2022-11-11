import { rest } from "msw";

const getTaskResponse = {
  location: {
    type: "Point",
    name: "2000",
    coordinates: "[0, 0]",
  },
  status: "open",
  photos: [""],
  _id: "6350d7bc80c58772355d7620",
  category: "Cleaning",
  title: "Placeholder",
  details: "Test: End of Lease Cleaning",
  dueDate: "2023-01-01T00:00:00.000Z",
  budget: 200,
  timeEstimate: "1-3hrs",
  timeOfArrival: "7am-10am",
  customerId: "cus_Me9GBxVg1aUC69",
  createdAt: "2022-10-20T05:08:12.717Z",
  updatedAt: "2022-10-20T05:08:12.717Z",
  __v: 0,
  timeElapsed: "8 days ago",
  id: "6350d7bc80c58772355d7620",
};

export const getTask = rest.get(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/:id`,
  (req, res, ctx) => {
    return res(ctx.json(getTaskResponse));
  }
);
