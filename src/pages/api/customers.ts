import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import { stripe } from "@/backend/services/payments";
import { Customer } from "@/backend/data/customers";
import { getPrimaryEmailAddress } from "@/backend/services/users";

async function createStripeCustomer(req: NextApiRequest, res: NextApiResponse) {
  const { user, userId } = getAuth(req);

  if (!user || !userId) return res.status(401).end("Unauthorized");

  const emailAddressResult = getPrimaryEmailAddress(user);

  if (emailAddressResult.type === "error")
    return res.status(500).end("Internal Server Error");

  const params = {
    email: emailAddressResult.email,
    metadata: {
      userId,
    },
  };

  const stripeCustomer = await stripe.customers.create(params);
  const stripeCustomerId = stripeCustomer.id;

  const customerDocument = await Customer.create({
    userId,
    customerId: stripeCustomerId,
  });

  return res.status(200).json({
    data: customerDocument,
    message: "Successfully Created Stripe Customer",
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Supported" });

  return await createStripeCustomer(req, res);
}
