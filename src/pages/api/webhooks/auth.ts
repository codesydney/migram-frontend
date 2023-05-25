import { NextApiRequest, NextApiResponse } from "next";
import to from "await-to-js";
import pino from "pino";

import { updateUser } from "@/data/users";
import { verifyClerkWebhook } from "@/util/webhooks";

export const config = { api: { bodyParser: false } };

const logger = pino({
  name: "User Webhook Handler",
});

async function handleUserCreated(payload: any, res: NextApiResponse) {
  const newUser = {
    userId: payload.data.id as string,
  };
  const publicMetadata = {
    callsRemaining: 1,
  };

  const [err, user] = await to(updateUser(newUser.userId, { publicMetadata }));

  if (!user || err) {
    const message = "Failed to create user";
    logger.error({ err, newUser }, message);
    return res.status(500).json({ message, userId: newUser.userId });
  }

  const response = { userId: user.id };

  logger.info(response, "New User Created");
  return res.status(200).json(response);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const verificationResult = await verifyClerkWebhook(req);

  if (verificationResult.type === "error") {
    return res
      .status(verificationResult.status)
      .json({ error: verificationResult.error });
  }

  const event = verificationResult.payload?.type;

  switch (event) {
    case "user.created":
      return handleUserCreated(verificationResult.payload, res);
    default:
      return res.status(200).json({ event });
  }
}
