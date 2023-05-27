import { NextApiRequest, NextApiResponse } from "next";

import { TaskModel } from "@/backend/data/tasks";
import { dbConnect } from "@/backend/services/db";
import { authenticate } from "@/backend/middlewares/auth";
import { OfferModel } from "@/backend/data/offers";
import { CustomerMetadata } from "@/backend/services/users/types";

async function getOffersOfTasks(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { user } = authResult;
  const id = req.query.id;
  const task = await TaskModel.findById({ _id: id });

  const userMetadata = user.publicMetadata as CustomerMetadata;
  const customerId = userMetadata.customerId;
  const isTaskOwner = customerId === task.customerId;

  if (!isTaskOwner) {
    return res.status(403).json({
      message: "Forbidden: You do not have access to this resource.",
    });
  }

  const offers = await OfferModel.find({ taskId: id });

  return res.status(200).json({ data: offers });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      return getOffersOfTasks(req, res);
    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
