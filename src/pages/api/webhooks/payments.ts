import { NextApiRequest, NextApiResponse } from "next";
import pino from "pino";
import Stripe from "stripe";

import { WebhookEventModel } from "@/backend/data/webhooks";
import { verifyStripeWebhook } from "@/backend/util/webhooks";

const logger = pino({ name: "Payments Webhook Handler" });

async function handlePaymentIntentSucceeded(
  payload: Stripe.Event,
  res: NextApiResponse
) {
  logger.info({ id: payload.id }, "Stripe Payment Intent Succeeded");
  const { id } = payload;
  const existingEvent = await WebhookEventModel.findOne({ id });

  if (existingEvent && existingEvent.status !== "rejected") {
    return res.status(200).json({ message: "duplicate" });
  }

  await WebhookEventModel.create({ id, source: "Stripe", status: "pending" });

  const paymentIntent = payload.data.object as Stripe.PaymentIntent;
  const userId = paymentIntent.metadata.userId;

  await WebhookEventModel.updateOne({ id }, { status: "success" });

  logger.info({ userId });

  return res.status(200).json({ userId });
}

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const verificationResult = await verifyStripeWebhook(req);

  if (verificationResult.type === "error") {
    return res
      .status(verificationResult.status)
      .json({ error: verificationResult.error });
  }

  const event = verificationResult.payload.type;

  switch (event) {
    case "payment_intent.succeeded":
      return handlePaymentIntentSucceeded(verificationResult.payload, res);
    default:
      return res.status(200).json({ event });
  }
}
