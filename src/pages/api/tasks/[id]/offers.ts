import { NextApiRequest, NextApiResponse } from "next";

import { OfferModel } from "@/backend/data/offers";
import { TaskModel } from "@/backend/data/tasks";
import { dbConnect } from "@/backend/services/db";
import { authenticate } from "@/backend/middlewares/auth";
import { CustomerMetadata } from "@/backend/services/users/types";
import { isUserServiceProvider } from "@/backend/services/users";

async function getOffersOfTasks(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { user } = authResult;
  const id = req.query.id;
  const task = await TaskModel.findById({ _id: id });

  if (!task) return res.status(404).json({ message: "Task not found" });

  const isTaskOwner = customerId === task.customerId;

  const offers = await OfferModel.find({ taskId: id });

  return res.status(200).json({ data: offers });
}

async function createOffer(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { user, userId } = authResult;
  const isServiceProvider = isUserServiceProvider(user);

  if (!isServiceProvider) {
    return res.status(403).json({
      message: "Forbidden: Only Customer Users can perform this operation",
    });
  }

  const serviceProviderId = user.publicMetadata.serviceProviderId;
  const taskId = req.query.id;

  const task = await TaskModel.findById({ _id: taskId });

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.status !== "Open")
    return res.status(400).json({ message: "Task is no longer open" });

  const existingOffer = await OfferModel.findOne({ taskId, serviceProviderId });

  if (existingOffer)
    return res.status(400).json({ message: "Offer already exists" });

  const payload = req.body;
  const offer = await OfferModel.create({
    ...payload,
    taskId: task._id,
    serviceProviderId,
    userId,
  });

  return res.status(200).json({ data: offer });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      return getOffersOfTasks(req, res);
    case "POST":
      return createOffer(req, res);
    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
