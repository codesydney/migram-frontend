import { NextApiRequest, NextApiResponse } from "next";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import pino from "pino";

import { CustomerModel } from "@/backend/data/customers";
import { authenticate } from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/services/db";
import { stripe } from "@/backend/services/payments";
import { getPrimaryEmailAddress } from "@/backend/services/users";
import { UserMetadata } from "@/backend/services/users/types";

const logger = pino({ name: "api/customers" });

async function createStripeCustomer(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { user, userId } = authResult;

  const userMetadata = user.publicMetadata as UserMetadata;

  if (userMetadata.role === "service-provider")
    return res.status(400).json({
      message: "Bad Request: Service Providers cannot sign up as Customers",
    });

  const existingCustomer = await CustomerModel.findById(userId);

  if (existingCustomer) {
    const message = "Stripe Customer has already been registered";
    logger.error(message);

    return res.status(400).json({ message });
  }

  const emailAddressResult = getPrimaryEmailAddress(user!);

  if (emailAddressResult.type === "error") {
    logger.error(
      { userId: user.id },
      "Error getting primary email address for user"
    );

    return res.status(500).end("Internal Server Error");
  }

  const params = {
    email: emailAddressResult.email,
    metadata: {
      userId,
    },
  };

  const stripeCustomer = await stripe.customers.create(params);
  const stripeCustomerId = stripeCustomer.id;

  const newCustomer = await CustomerModel.create({
    _id: userId,
    customerId: stripeCustomerId,
  });

  await clerkClient.users.updateUser(userId, {
    publicMetadata: { customerId: stripeCustomerId, role: "customer" },
  });

  const message = `Successfully Created Stripe Customer for ${userId}`;
  logger.info({ customer: newCustomer }, message);

  return res.status(200).json({
    data: newCustomer,
    message: message,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Supported" });

  await dbConnect();
  return await createStripeCustomer(req, res);
}
