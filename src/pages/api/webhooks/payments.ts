import { NextApiRequest, NextApiResponse } from "next";
import pino from "pino";
import Stripe from "stripe";

// import {
//   createWebhookEvent,
//   deleteWebhookEvent,
//   getWebhookEvent,
// } from "@/data/webhooks";
import { updateUserCalls } from "@/services/users";
import { verifyStripeWebhook } from "@/util";

const logger = pino({ name: "Payments Webhook Handler" });

async function handlePaymentIntentSucceeded(
  payload: Stripe.Event,
  res: NextApiResponse
) {
  logger.info({ id: payload.id }, "Stripe Payment Intent Succeeded");
  const { id } = payload;
  // const existingEvent = await getWebhookEvent(id);

  // if (existingEvent) {
  //   return res.status(200).json({ message: "duplicate" });
  // }

  // await createWebhookEvent({ id });

  const paymentIntent = payload.data.object as Stripe.PaymentIntent;
  const userId = paymentIntent.metadata.userId;

  const updateCallsResult = await updateUserCalls(userId);

  if (updateCallsResult.type === "error") {
    // await deleteWebhookEvent(id);

    return res
      .status(updateCallsResult.status)
      .json({ error: updateCallsResult.error });
  }

  // await deleteWebhookEvent(id);

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
