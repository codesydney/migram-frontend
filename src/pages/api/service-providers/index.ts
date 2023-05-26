import { NextApiRequest, NextApiResponse } from "next";
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import pino from "pino";

import { ServiceProvider } from "@/backend/data/serviceproviders";
import {
  createStripeConnectAccount,
  createStripeConnectRedirectLink,
} from "@/backend/services/payments/connect";
import { getPrimaryEmailAddress } from "@/backend/services/users";
import { UserMetadata } from "@/backend/services/users/types";

const logger = pino({ name: "api/service-providers" });

async function createServiceProvider(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).end("Unauthorized");

  const user = await clerkClient.users.getUser(userId);
  if (!user) return res.status(500).end("Internal Server Error");

  const userMetadata = user.publicMetadata as UserMetadata;

  if (userMetadata.role !== "customer")
    return res.status(400).json({
      message: "Bad Request: Customers cannot sign up as Service Providers",
    });

  const existingServiceProvider = await ServiceProvider.findById(userId);

  if (existingServiceProvider) {
    const message = "Stripe Service Provider has already been registered";
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

  const stripeAccount = await createStripeConnectAccount({
    userId,
    email: emailAddressResult.email,
  });
  const serviceProviderId = stripeAccount.id;

  const newServiceProvider = await ServiceProvider.create({
    _id: userId,
    serviceProviderId,
  });

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      serviceProviderId,
      role: "service-provider",
      onboardingStatus: "pending",
    },
  });

  logger.info(
    { serviceProvider: newServiceProvider },
    "Generating Stripe Connect Onboarding Link"
  );

  const stripeConnectLink = await createStripeConnectRedirectLink(
    serviceProviderId
  );

  const message = `Successfully Created Stripe Service Provider for ${userId}.`;
  logger.info({ serviceProviderId }, message);

  return res.status(200).json({
    data: newServiceProvider,
    message:
      message +
      " Please follow the redirect link to complete onboarding via Stripe.",
    redirect: stripeConnectLink,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Supported" });

  return await createServiceProvider(req, res);
}