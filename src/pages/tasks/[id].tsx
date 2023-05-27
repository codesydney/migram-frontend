import { useState, useEffect } from "react";
import axios from "axios";

import { Task } from "@/types/schemas/Task";
import { useRouter } from "next/router";

type ServerTask = Omit<Task, "dueDate"> & { dueDate: string };
type GetTaskResponse = { data: ServerTask };

export default function TaskItemPage() {
  const [task, setTask] = useState<Task | undefined>();
  const router = useRouter();

  const id = router.query.id as string;

  useEffect(() => {
    if (id) {
      const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks/${id}`;
      axios.get<GetTaskResponse>(url).then((response) => {
        const originalTask = response.data.data;

        const task: Task = {
          ...originalTask,
          dueDate: new Date(originalTask.dueDate),
        };

        setTask(task);
      });
    }
  }, [id]);

  if (!task) {
    // TODO handle loading state
    return <div>Something Went Wrong</div>;
  }

  return <TaskDetails task={task} />;
}

export function TaskDetails({ task }: { task: Task }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Task Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Details about the Task
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Budget
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                ${task.budget}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Short Description
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {task.shortDescription}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                More Details
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {task.details}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Contact
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                David Taing
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
