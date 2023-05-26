import { NextApiRequest, NextApiResponse } from "next";

import { Task } from "@/backend/data/tasks";
import { dbConnect } from "@/backend/services/db";
import { authenticate } from "@/backend/middlewares/auth";
import { isUserCustomer } from "@/backend/services/users";

async function getTasks(req: NextApiRequest, res: NextApiResponse) {
  const tasks = await Task.find();

  return res.status(200).json({ data: tasks });
}

async function createTask(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await authenticate(req);

  if (authResult.type === "error")
    return res.status(authResult.status).json({ message: authResult.message });

  const { user } = authResult;

  const isCustomer = isUserCustomer(user);

  if (!isCustomer) {
    return res.status(403).json({
      message: "Forbidden: Only Customer Users can perform this operation",
    });
  }

  const payload = req.body;
  const task = await Task.create(payload);

  return res.status(200).json({ data: task });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      return getTasks(req, res);
    case "POST":
      return createTask(req, res);
    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
