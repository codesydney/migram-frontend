import { NextApiRequest, NextApiResponse } from "next";
import pino from "pino";

import { TaskModel } from "@/backend/data/tasks";
import { dbConnect } from "@/backend/services/db";
import { OfferModel } from "@/backend/data/offers";
import { authenticate } from "@/backend/middlewares/auth";
import { UserMetadata } from "@/backend/services/users/types";

const logger = pino({ name: "GET /api/my-tasks" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Supported" });

  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const userMetadata = authResult.user.publicMetadata as UserMetadata;

  if (userMetadata.role !== "customer")
    return res
      .status(403)
      .json({ message: "You are not authorized to access this endpoint." });

  await dbConnect();

  const tasks = await TaskModel.find({
    userId: authResult.userId,
  })
    .populate({
      path: "acceptedOffer",
      model: OfferModel,
      options: { skipInvalidIds: true },
    })
    .exec();

  logger.info({ tasks });

  return res.status(200).json({ data: tasks });
}
