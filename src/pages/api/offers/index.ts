import { OfferModel } from "@/backend/data/offers";
import { authenticate } from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/services/db";
import { NextApiRequest, NextApiResponse } from "next";

async function getOffers(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  await dbConnect();

  const offers = await OfferModel.find();

  return res.status(200).json({ data: offers });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getOffers(req, res);

    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
