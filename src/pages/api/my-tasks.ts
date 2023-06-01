import { NextApiRequest, NextApiResponse } from "next";
import pino from "pino";

import { TaskModel } from "@/backend/data/tasks";
import { dbConnect } from "@/backend/services/db";
import { OfferModel } from "@/backend/data/offers";

const logger = pino({ name: "GET /api/my-tasks" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Supported" });

  await dbConnect();

  const tasks = await TaskModel.find({
    userId: "user_2QHeWJyb22UhmMXAvbRjSmyCjHg",
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
