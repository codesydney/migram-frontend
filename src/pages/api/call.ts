import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import { PhoneService } from "@/services/phone";

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

  const phone = req.body.phone;

  if (!phone) {
    return res.status(400).json({ message: "Missing phone number" });
  }

  const result = await PhoneService.makeCall(phone);

  return res.status(200).json({ message: "hello world" });
}
