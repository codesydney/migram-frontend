import { NextApiRequest, NextApiResponse } from "next";

import { TaskModel } from "@/backend/data/tasks";
import { authenticate } from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/services/db";
import { isUserCustomer } from "@/backend/services/users";
import { CustomerMetadata, UserMetadata } from "@/backend/services/users/types";
import { OfferModel } from "@/backend/data/offers";

async function getTaskById(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { id } = req.query;
  const task = await TaskModel.findOne({ _id: id });

  if (!task) return res.status(404).json({ message: "Task not found" });

  const userMetadata = authResult.user.publicMetadata as UserMetadata;
  const customerId = userMetadata.customerId;
  const isTaskOwner = customerId === task?.customerId;

  const acceptedOffer = await OfferModel.findOne({ _id: task?.acceptedOffer });
  const serviceProviderId = userMetadata.serviceProviderId;
  const isAcceptedOfferOwner =
    serviceProviderId && serviceProviderId === acceptedOffer?.serviceProviderId;

  const responseBody = {
    data: {
      ...task.toObject(),
      paymentStatus:
        isTaskOwner || isAcceptedOfferOwner ? task.paymentStatus : undefined,
    },
  };

  return res.status(200).json(responseBody);
}

async function updateTask(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { user } = authResult;

  const isCustomer = isUserCustomer(user);
  if (!isCustomer)
    return res.status(403).json({
      message: "Forbidden: Only Customers may perform this action.",
    });

  const { id } = req.query;
  const task = await TaskModel.findById({ _id: id });

  const userMetadata = user.publicMetadata as CustomerMetadata;
  const customerId = userMetadata.customerId;
  const isTaskOwner = customerId === task?.customerId;

  if (!isTaskOwner) {
    return res.status(403).json({
      message: "Forbidden: You do not have access to this resource.",
    });
  }

  const payload = req.body;

  if (payload.status)
    return res
      .status(400)
      .json({ message: "Task status cannot be updated by this operation." });

  task.set(payload);
  const updatedTask = await task.save();

  return res.status(200).json({ data: updatedTask });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      return getTaskById(req, res);
    case "PATCH":
      return updateTask(req, res);
    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
