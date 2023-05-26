import { NextApiRequest, NextApiResponse } from "next";

import { Task } from "@/backend/data/tasks";

async function getTasks(req: NextApiRequest, res: NextApiResponse) {
  const tasks = await Task.find();

  return res.status(200).json({ data: tasks });
}

async function createTask(req: NextApiRequest, res: NextApiResponse) {
  const task = await Task.create({});

  return res.status(200).json({ data: task });
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
