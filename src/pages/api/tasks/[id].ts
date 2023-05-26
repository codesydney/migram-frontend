import { NextApiRequest, NextApiResponse } from "next";

import { Task } from "@/backend/data/tasks";

async function getTaskById(req: NextApiRequest, res: NextApiResponse) {
  const id = "";

  return Task.findOne({ id });
}

async function updateTask(req: NextApiRequest, res: NextApiResponse) {
  const id = "";
  const task = {};

  return Task.updateOne({ id }, task);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getTaskById(req, res);
    case "PATCH":
      return updateTask(req, res);
    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
