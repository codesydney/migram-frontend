import { NextApiRequest, NextApiResponse } from "next";

import { OfferModel } from "@/backend/data/offers";
import { TaskModel } from "@/backend/data/tasks";
import { dbConnect } from "@/backend/services/db";
import { authenticate } from "@/backend/middlewares/auth";
import { UserMetadata } from "@/backend/services/users/types";
import {
  getPrimaryEmailAddress,
  isUserServiceProvider,
} from "@/backend/services/users";
import { TaskOffer } from "@/types/schemas/Offer";

/**
 * Hide non-owner's offer amounts and email addresses
 * @param offers Array of TaskOffers
 * @param serviceProviderId (Optional) Service Provider Id
 */
const hideSensitiveOfferData = (
  offers: TaskOffer[],
  serviceProviderId?: string
) => {
  return offers.map((item) => {
    const isOfferOwner = item.serviceProviderId === serviceProviderId;
    const amount = isOfferOwner ? item.amount : undefined;
    const contactEmail = isOfferOwner ? item.contactEmail : undefined;

    return {
      ...item,
      amount,
      contactEmail,
    };
  });
};

async function getTaskOffers(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { user } = authResult;
  const id = req.query.id;
  const task = await TaskModel.findById({ _id: id });

  if (!task) return res.status(404).json({ message: "Task not found" });

  const userMetadata = user.publicMetadata as UserMetadata;
  const customerId = userMetadata?.customerId;
  const isTaskOwner = customerId === task.customerId;

  const offers = await OfferModel.find({ taskId: id });

  if (!isTaskOwner) {
    const serviceProviderId = userMetadata?.serviceProviderId;

    const results: TaskOffer[] = hideSensitiveOfferData(
      offers.map((item) => item.toObject()),
      serviceProviderId
    );

    return res.status(200).json({ data: results });
  }

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
    contactEmail: getPrimaryEmailAddress(user).email,
    contactName: `${user.firstName} ${user.lastName}`,
    contactPhoto: user.profileImageUrl,
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
      return getTaskOffers(req, res);
    case "POST":
      return createOffer(req, res);
    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
