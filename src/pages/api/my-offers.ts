import { NextApiRequest, NextApiResponse } from "next";

import { OfferModel } from "@/backend/data/offers";
import { dbConnect } from "@/backend/services/db";
import { authenticate } from "@/backend/middlewares/auth";
import { UserMetadata } from "@/backend/services/users/types";
import { TaskModel } from "@/backend/data/tasks";

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

  if (userMetadata.role !== "service-provider")
    return res
      .status(403)
      .json({ message: "You are not authorized to access this endpoint." });

  await dbConnect();

  const offers = await OfferModel.find({
    userId: authResult.userId,
  })
    .populate({
      path: "task",
      model: TaskModel,
    })
    .exec();

  return res.status(200).json({ data: offers });
}
