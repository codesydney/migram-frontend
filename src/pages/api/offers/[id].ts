import { OfferModel } from "@/backend/data/offers";
import { authenticate } from "@/backend/middlewares/auth";
import { isUserServiceProvider } from "@/backend/services/users";
import { ServiceProviderMetadata } from "@/backend/services/users/types";
import { NextApiRequest, NextApiResponse } from "next";

async function getOfferById(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { id } = req.query;
  const offer = await OfferModel.findOne({ id });

  return res.status(200).json({ data: offer });
}

async function updateOffer(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { user } = authResult;

  const isServiceProvider = isUserServiceProvider(user);
  if (!isServiceProvider)
    return res.status(403).json({
      message: "Forbidden: Only Service Providers may perform this action.",
    });

  const { id } = req.query;
  const offer = await OfferModel.findById({ id });

  const userMetadata = user.publicMetadata as ServiceProviderMetadata;
  const serviceProviderId = userMetadata.serviceProviderId;
  const isOfferOwner = serviceProviderId === offer.serviceProviderId;

  if (!isOfferOwner) {
    return res.status(403).json({
      message: "Forbidden: You do not have access to this resource.",
    });
  }

  const payload = req.body;
  offer.set(payload);
  const updatedOffer = await offer.save();

  return res.status(200).json({ data: updatedOffer, id });
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
