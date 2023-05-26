import { Offer } from "@/backend/data/offers";
import { NextApiRequest, NextApiResponse } from "next";

async function getOffers(req: NextApiRequest, res: NextApiResponse) {
  const offers = await Offer.find();

  return res.status(200).json({ data: offers });
}

async function createOffer(req: NextApiRequest, res: NextApiResponse) {
  const offer = await Offer.create({});

  return res.status(200).json({ data: offer });
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
