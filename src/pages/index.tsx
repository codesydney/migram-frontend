import axios from "axios";
import { useEffect, useState } from "react";
import { MapPinIcon, WrenchScrewdriverIcon } from "@heroicons/react/20/solid";

import { Task, TaskStatus } from "@/types/schemas/Task";
import { SignedIn } from "@clerk/nextjs";

type ServerTask = Omit<Task, "dueDate"> & { dueDate: string };
type GetTasksResponse = { data: ServerTask[] };

export default function TasksPage() {
  const [tasks, setTasks] = useState(new Array<Task>());

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks`;
    axios.get<GetTasksResponse>(url).then((response) => {
      const tasks: Task[] = response.data.data.map((task) => ({
        ...task,
        dueDate: new Date(task.dueDate),
      }));

      setTasks(tasks);
    });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="inline-block text-2xl font-bold tracking-tight text-gray-900">
            Tasks
          </h2>
          <SignedIn>
            <a href="/tasks/create">
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Task
              </button>
            </a>
          </SignedIn>
        </div>

        <div className="mt-8 grid gap-4 md:gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:gap-x-8">
          {tasks.map((task: Task) => (
            <div
              key={task._id}
              className="flex flex-col gap-4 text-gray-500 group relative border-2 border-gray-400 p-4 rounded-md hover:border-indigo-600 hover:text-indigo-600"
            >
              <h3 className="text-lg text-gray-700 font-bold group-hover:text-indigo-600">
                <a href={`/tasks/${task._id}`}>
                  <span className="absolute inset-0" />
                  {task.shortDescription}
                </a>
              </h3>
              <p className="mt-auto flex gap-2">
                <WrenchScrewdriverIcon className="h-6 w-6" />
                {task.category}
              </p>
              <p className="flex gap-2">
                <MapPinIcon className="h-6 w-6" />
                <span>{task.location.city}</span>
              </p>
              <p className="flex gap-2">
                <TaskStatusBadge status={task.status} />
              </p>
              <p className="text-xl font-medium text-gray-900 group-hover:text-indigo-600">
                ${task.budget}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export type TaskStatusBadgeProps = {
  status: TaskStatus;
};

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  switch (status) {
    case "Open":
      return (
        <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
          {status}
        </span>
      );
    case "In Progress":
      return (
        <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
          {status}
        </span>
      );
    case "Completed":
      return (
        <span className="inline-flex items-center rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">
          {status}
        </span>
      );
    default:
      return <></>;
  }
}
