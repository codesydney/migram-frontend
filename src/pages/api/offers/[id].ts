import { Offer } from "@/backend/data/offers";
import { NextApiRequest, NextApiResponse } from "next";

async function getOfferById(req: NextApiRequest, res: NextApiResponse) {
  const id = "";

  return Offer.findOne({ id });
}

async function updateOffer(req: NextApiRequest, res: NextApiResponse) {
  const id = "";
  const offer = {};

  return Offer.updateOne({ id }, offer);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getOfferById(req, res);
    case "PATCH":
      return updateOffer(req, res);
    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
