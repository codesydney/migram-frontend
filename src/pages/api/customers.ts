import { NextApiRequest, NextApiResponse } from "next";

import { stripe } from "@/backend/services/payments";

async function createStripeCustomer(req: NextApiRequest, res: NextApiResponse) {
  const params = { email: "hello@email.com", name: "TODO Remove" };

  const customer = await stripe.customers.create(params);

  return res.status(200).json({ customer: customer });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Supported" });

  return await createStripeCustomer(req, res);
}
