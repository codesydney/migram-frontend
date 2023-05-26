import { Offer } from "@/backend/data/offers";
import { NextApiRequest, NextApiResponse } from "next";

async function getOffers(req: NextApiRequest, res: NextApiResponse) {
  return Offer.find();
}

async function createOffer(req: NextApiRequest, res: NextApiResponse) {
  const offer = {};

  return Offer.create(offer);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getOffers(req, res);
    case "POST":
      return createOffer(req, res);
    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
