import { Offer } from "@/backend/data/offers";
import { authenticate } from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/services/db";
import { isUserServiceProvider } from "@/backend/services/users";
import { NextApiRequest, NextApiResponse } from "next";

async function getOffers(req: NextApiRequest, res: NextApiResponse) {
  const offers = await Offer.find();

  return res.status(200).json({ data: offers });
}

async function createOffer(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { user } = authResult;

  const isServiceProvider = isUserServiceProvider(user);

  if (!isServiceProvider) {
    return res.status(403).json({
      message: "Forbidden: Only Customer Users can perform this operation",
    });
  }

  const payload = req.body;
  const offer = await Offer.create(payload);

  return res.status(200).json({ data: offer });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      return getOffers(req, res);
    case "POST":
      return createOffer(req, res);
    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
