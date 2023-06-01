import { NextApiRequest, NextApiResponse } from "next";
import to from "await-to-js";
import pino from "pino";
import Stripe from "stripe";

import { WebhookEventModel } from "@/backend/data/webhooks";
import { verifyStripeWebhook } from "@/backend/util/webhooks";
import { TaskModel } from "@/backend/data/tasks";

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
  const taskId = paymentIntent.metadata.taskId;

  const [err, task] = await to(
    TaskModel.findOneAndUpdate(
      { _id: taskId },
      {
        paymentStatus: "Paid",
      }
    )
  );

  if (err || !task) {
    logger.info({ err, task });
    return res.status(400).json({ message: "Task not found." });
  }

  await WebhookEventModel.updateOne({ id }, { status: "success" });
  return res.status(200).json({ taskId });
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

  const event = verificationResult.payload?.type;

  switch (event) {
    case "payment_intent.succeeded":
      return handlePaymentIntentSucceeded(verificationResult.payload, res);
    default:
      return res.status(200).json({ event });
  }
}
