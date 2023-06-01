import { NextApiRequest, NextApiResponse } from "next";

import { OfferModel } from "@/backend/data/offers";
import { TaskModel } from "@/backend/data/tasks";
import { authenticate } from "@/backend/middlewares/auth";

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

  const offer = await OfferModel.findOne({ _id: id });

  if (!offer) return res.status(404).json({ message: "Offer not found" });

  const task = await TaskModel.findOne({ _id: offer.task });

  if (!task)
    return res
      .status(500)
      .json({ message: "The task that offer belongs to could not be found." });

  const isOfferOwner = authResult.userId === offer?.userId;

  if (!isOfferOwner)
    return res
      .status(403)
      .json({ message: "You are not allowed to access this resource" });

  if (offer.status !== "Accepted" || task.status !== "In Progress")
    return res.status(400).json({
      message: "Offers cannot be completed if the status is not 'Accepted'",
    });

  offer.set({ status: "Completed" });
  task.set({ status: "Completed", paymentStatus: "Payment Due" });

  await Promise.all([offer.save(), task.save()]);

  return res.status(200).json({
    data: {
      taskId: task._id,
      offerId: offer._id,
    },
  });
}
