import { NextApiRequest, NextApiResponse } from "next";

import { Task } from "@/backend/data/tasks";

async function getTasks() {
  return Task.find();
}

async function getTaskById(id: string) {
  return Task.findOne({ id });
}

async function createTask(task: any) {
  return Task.create(task);
}

async function updateTask(id: string, task: any) {
  return Task.updateOne({ id }, task);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ message: "Hello World" });
}
