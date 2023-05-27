import { Task } from "@/types/schemas/Task";
import axios from "axios";
import { useEffect, useState } from "react";

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
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Tasks
          </h2>
          <a href="/tasks/create">
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Task
            </button>
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8">
          {tasks.map((task: any) => (
            <div key={task._id} className="group relative">
              <h3 className="mt-4 text-sm text-gray-700">
                <a href={`/tasks/${task._id}`}>
                  <span className="absolute inset-0" />
                  {task.shortDescription}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{task.budget}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                ${task.budget}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
