import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).end("Unauthorized");
  }

  const session = await stripe.checkout.sessions.create({
    client_reference_id: userId,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1NA6WxI1U4PtrYcnwLJuLmBZ",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/?success=true`,
    cancel_url: `http://localhost:3000/?canceled=true`,
    payment_intent_data: {
      metadata: {
        userId,
      },
    },
  });

  res.status(200).json({ checkout_url: session.url });
}
