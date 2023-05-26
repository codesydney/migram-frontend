import { Offer } from "@/backend/data/offers";
import { NextApiRequest, NextApiResponse } from "next";

async function getOfferById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const offer = await Offer.findOne({ id });

  return res.status(200).json({ data: offer });
}

async function updateOffer(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const payload = req.body;
  const offer = Offer.updateOne({ id }, payload);

  return res.status(200).json({ data: offer, id });
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
