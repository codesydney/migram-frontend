import { NextApiRequest } from "next";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { buffer } from "micro";
import pino from "pino";
import { Stripe } from "stripe";
import { Webhook } from "svix";

import { stripe } from "@/backend/services/payments";

const CLERK_WEBHOOK_AUTH_SECRET = process.env.CLERK_WEBHOOK_AUTH_SECRET;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const logger = pino({
  name: "Webhook Verification",
});

export type VerifyWebhookResult<T> =
  | {
      type: "verified";
      payload: T;
    }
  | {
      type: "error";
      status: number;
      error: Error;
    };

export async function verifyClerkWebhook(
  req: NextApiRequest
): Promise<VerifyWebhookResult<WebhookEvent>> {
  if (!CLERK_WEBHOOK_AUTH_SECRET) {
    return {
      type: "error",
      status: 500,
      error: new Error("CLERK_WEBHOOK_AUTH_SECRET is not set"),
    };
  }

  const payload = (await buffer(req)).toString();
  const headers = req.headers as any;

  const wh = new Webhook(CLERK_WEBHOOK_AUTH_SECRET);
  let msg;

  try {
    msg = wh.verify(payload, headers) as WebhookEvent;
  } catch (error: any) {
    logger.info({ error }, "Webhook Verification Error");
    return { type: "error", status: 400, error };
  }

  return { type: "verified", payload: msg };
}

export async function verifyStripeWebhook(
  req: NextApiRequest
): Promise<VerifyWebhookResult<Stripe.Event>> {
  if (!STRIPE_WEBHOOK_SECRET) {
    return {
      type: "error",
      status: 500,
      error: new Error("STRIPE_WEBHOOK_SECRET is not set"),
    };
  }

  const payload = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    if (!sig) throw new Error("Stripe signature is missing");

    event = stripe.webhooks.constructEvent(payload, sig, STRIPE_WEBHOOK_SECRET);
  } catch (error: any) {
    logger.info({ error }, "Webhook Verification Error");
    return { type: "error", status: 400, error };
  }

  return { type: "verified", payload: event };
}
