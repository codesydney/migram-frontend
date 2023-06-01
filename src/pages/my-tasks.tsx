import { useEffect, useState } from "react";
import axios from "axios";

import { Task } from "@/types/schemas/Task";
import { TaskStatusBadge } from "@/components/TaskStatusBadge";
import { Offer } from "@/types/schemas/Offer";
import { MakePaymentButton } from "@/components/MakePaymentButton";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";

export type MyTask = Task & { acceptedOffer: Offer };
type GetTasksResponse = { data: MyTask[] };

export default function MyTasksPage() {
  const [myTasks, setMyTasks] = useState<MyTask[]>([]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/my-tasks`;
    axios.get<GetTasksResponse>(url).then((response) => {
      const tasks = response.data.data.map((task) => ({
        ...task,
        dueDate: new Date(task.dueDate),
      }));

      setMyTasks(tasks);
    });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="inline-block text-2xl font-bold tracking-tight text-gray-900">
            My Tasks
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
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Payment
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Budget
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Agreed Amount
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Service Provider
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {myTasks.map((task) => (
                    <tr key={task._id}>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">
                          <a
                            href={`/tasks/${task._id}`}
                            className="underline hover:text-indigo-600"
                          >
                            {task.shortDescription}
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <TaskStatusBadge status={task.status} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <PaymentStatusBadge status={task.paymentStatus} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ${task.budget}.00
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                        {task.acceptedOffer &&
                          `$${task.acceptedOffer.amount}.00`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {task.acceptedOffer && (
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img
                                className="h-11 w-11 rounded-full"
                                src={task.acceptedOffer?.contactPhoto}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {task.acceptedOffer?.contactName}
                              </div>
                              <div className="mt-1 text-gray-500">
                                {task.acceptedOffer?.contactEmail}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      {task.status === "Completed" &&
                        task.paymentStatus !== "Paid" && (
                          <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <MakePaymentButton taskId={task._id} />
                          </td>
                        )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
