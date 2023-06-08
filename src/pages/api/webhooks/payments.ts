import { NextApiRequest, NextApiResponse } from "next";
import to from "await-to-js";
import pino from "pino";
import Stripe from "stripe";

import { WebhookEventModel } from "@/backend/data/webhooks";
import { verifyStripeWebhook } from "@/backend/util/webhooks";
import { TaskModel } from "@/backend/data/tasks";
import { dbConnect } from "@/backend/services/db";

const logger = pino({ name: "Payments Webhook Handler" });

async function handlePaymentIntentSucceeded(
  payload: Stripe.Event,
  res: NextApiResponse
) {
  logger.info({ id: payload.id }, "Stripe Payment Intent Succeeded");
  const { id } = payload;

  let err, task, existingEvent;
  [err, existingEvent] = await to(WebhookEventModel.findOne({ id }));

  if (existingEvent && existingEvent.status !== "rejected") {
    return res.status(200).json({ message: "duplicate" });
  }

  [err] = await to(
    WebhookEventModel.create({
      _id: id,
      source: "Stripe",
      status: "pending",
    })
  );

  if (err) {
    const message = "Failed to save webhook event status to database";
    logger.error({ eventId: id }, message);

    return res.status(500).json({ eventId: id, message });
  }

  const paymentIntent = payload.data.object as Stripe.PaymentIntent;
  const taskId = paymentIntent.metadata.taskId;

  [err, task] = await to(
    TaskModel.findOneAndUpdate(
      { id: taskId },
      {
        paymentStatus: "Paid",
      }
    )
  );

  if (err || !task) {
    const message = `Task Not Found: ${taskId}`;
    logger.info({ eventId: id, err, task, taskId }, message);
    return res.status(404).json({ eventId: id, message });
  }

  [err] = await to(
    WebhookEventModel.updateOne({ _id: id }, { status: "success" })
  );

  if (err) {
    const message = "Failed to update webhook event with success status";
    logger.error({ id }, message);

    return res.status(500).json({ eventId: id, message });
  }

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

  await dbConnect();

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
