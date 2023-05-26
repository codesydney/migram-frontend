import { NextApiRequest, NextApiResponse } from "next";

import { Task } from "@/backend/data/tasks";

async function getTasks(req: NextApiRequest, res: NextApiResponse) {
  return Task.find();
}

async function createTask(req: NextApiRequest, res: NextApiResponse) {
  const task = {};

  return Task.create(task);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getTasks(req, res);
    case "POST":
      return createTask(req, res);
    default:
      return res.status(405).json({ message: "Method Not Supported" });
  }
}
