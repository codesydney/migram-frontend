import { NextApiRequest, NextApiResponse } from "next";

import { OfferModel } from "@/backend/data/offers";
import { TaskModel } from "@/backend/data/tasks";
import { authenticate } from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/services/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Supported" });

  const { id } = req.query;

  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  await dbConnect();

  const offer = await OfferModel.findOne({ _id: id });

  if (!offer) return res.status(404).json({ message: "Offer not found" });

  const task = await TaskModel.findOne({ _id: offer.task });

  if (!task)
    return res
      .status(500)
      .json({ message: "The task that offer belongs to could not be found." });

  const isTaskOwner = authResult.userId === task?.userId;

  if (!isTaskOwner)
    return res
      .status(403)
      .json({ message: "You are not allowed to access this resource" });

  if (task.status !== "Open")
    return res.status(400).json({
      message: "Tasks cannot be approved if the status is not 'Open'",
    });

  if (task.acceptedOffer)
    return res
      .status(400)
      .json({ message: "An offer has already been approved" });

  const otherOffersFilter = {
    task: task._id,
    _id: { $ne: offer._id },
  };

  await OfferModel.updateMany(otherOffersFilter, {
    status: "Rejected",
  });

  offer.set({ status: "Accepted" });
  task.set({ status: "In Progress", acceptedOffer: offer._id });

  await Promise.all([offer.save(), task.save()]);

  return res.status(200).json({
    data: {
      task: task._id,
      offerId: offer._id,
    },
  });
}
