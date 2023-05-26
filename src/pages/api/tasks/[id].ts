import { NextApiRequest, NextApiResponse } from "next";

import { Task } from "@/backend/data/tasks";

async function getTaskById(req: NextApiRequest, res: NextApiResponse) {
  const id = "";
  const task = await Task.findOne({ id });

  return res.status(200).json({ data: task });
}

async function updateTask(req: NextApiRequest, res: NextApiResponse) {
  const id = "";
  const task = await Task.updateOne({ id }, {});

  return res.status(200).json({ data: task });
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
