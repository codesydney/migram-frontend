import { Offer } from "@/backend/data/offers";
import { NextApiRequest, NextApiResponse } from "next";

async function getOffers() {
  return Offer.find();
}

async function getOfferById(id: string) {
  return Offer.findOne({ id });
}

async function createOffer(offer: any) {
  return Offer.create(offer);
}

async function updateOffer(id: string, offer: any) {
  return Offer.updateOne({ id }, offer);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ message: "Hello World" });
}
