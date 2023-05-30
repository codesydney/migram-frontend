import to from "await-to-js";
import { NextApiRequest, NextApiResponse } from "next";

import { TaskModel } from "@/backend/data/tasks";
import { stripe } from "@/backend/services/payments/stripe";
import { OfferModel } from "@/backend/data/offers";
import { dbConnect } from "@/backend/services/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Invalid request method" });

  await dbConnect();

  const taskId = req.body.taskId as string;

  const task = await TaskModel.findOne({ _id: taskId });
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.status !== "Completed")
    return res.status(400).json({
      message: "Task cannot be checked out when the status is not 'Completed'",
    });

  const acceptedOffer = await OfferModel.findOne({ _id: task.acceptedOffer });

  if (!task.acceptedOffer || !acceptedOffer)
    return res.status(400).json({
      message:
        "Task cannot be checked out when an offer has not been accepted yet.",
    });

  const [err, paymentIntent] = await to(
    stripe.paymentIntents.create({
      amount: acceptedOffer.amount * 100,
      currency: "aud",
      automatic_payment_methods: {
        enabled: true,
      },
    })
  );

  if (err || !paymentIntent) {
    return res
      .status(500)
      .json({ message: "failed to create a new payment intent" });
  }

  return res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    task,
    acceptedOffer,
  });
}
