import { OfferModel } from "@/backend/data/offers";
import { TaskModel } from "@/backend/data/tasks";
import { authenticate } from "@/backend/middlewares/auth";
import { isUserServiceProvider } from "@/backend/services/users";
import { ServiceProviderMetadata as UserMetadata } from "@/backend/services/users/types";
import { NextApiRequest, NextApiResponse } from "next";

async function getOfferById(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { id } = req.query;
  const offer = await OfferModel.findOne({ _id: id });

  if (!offer) return res.status(404).json({ message: "Offer not found" });

  const task = await TaskModel.findOne({ _id: offer?.taskId });
  const userMetadata = authResult.user.publicMetadata as UserMetadata;
  const customerId = userMetadata?.customerId;
  const isTaskOwner = customerId === task?.customerId;

  const cleanedOffer = {
    ...offer?.toObject(),
    serviceProviderId: undefined,
    contactEmail: isTaskOwner ? offer.contactEmail : undefined,
  };

  return res.status(200).json({ data: cleanedOffer });
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
  const offer = await OfferModel.findById({ _id: id });

  const userMetadata = user.publicMetadata as UserMetadata;
  const serviceProviderId = userMetadata.serviceProviderId;
  const isOfferOwner = serviceProviderId === offer?.serviceProviderId;

  if (!isOfferOwner) {
    return res.status(403).json({
      message: "Forbidden: You do not have access to this resource.",
    });
  }

  const payload = req.body;

  if (payload.status)
    return res
      .status(400)
      .json({ message: "Offer status cannot be updated by this operation." });

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
