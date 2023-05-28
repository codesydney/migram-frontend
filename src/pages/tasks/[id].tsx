import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import to from "await-to-js";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  CreateOfferPayload,
  CreateOfferPayloadSchema,
  Offer,
} from "@/types/schemas/Offer";
import { Task } from "@/types/schemas/Task";

type ServerTask = Omit<Task, "dueDate"> & { dueDate: string };
type GetTaskResponse = { data: ServerTask };

export async function queryTaskById(id: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks/${id}`;
  const [err, response] = await to(axios.get<GetTaskResponse>(url));

  if (!response || err) {
    return null;
  }

  const originalTask = response.data.data;

  const task: Task = {
    ...originalTask,
    dueDate: new Date(originalTask.dueDate),
  };

  return task;
}

export default function TaskItemPage() {
  const [task, setTask] = useState<Task | undefined>();
  const router = useRouter();
  const { user } = useUser();
  const isProvider = user?.publicMetadata.role === "service-provider";
  const isCustomer = user?.publicMetadata.role === "customer";

  const id = router.query.id as string;

  useEffect(() => {
    queryTaskById(id).then((task) => {
      if (task) setTask(task);
    });
  }, [id]);

  if (!task) {
    // TODO handle loading state
    return <div>Something Went Wrong</div>;
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-10 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:gap-20 lg:max-w-7xl lg:px-8">
        <TaskDetails task={task} />
        {<TaskOffersList taskId={task._id} />}
        {isProvider && <MakeOfferForm taskId={task._id} />}
      </div>
    </div>
  );
}

export function TaskDetails({ task }: { task: Task }) {
  return (
    <div aria-label="Task Details">
      <div className="sm:px-0">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
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
  );
}

type GetTaskOffersResponse = { data: Offer[] };

export function TaskOffersList({ taskId }: { taskId: string }) {
  const [offers, setOffers] = useState(new Array<Offer>());

  useEffect(() => {
    if (taskId) {
      const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks/${taskId}/offers`;
      axios.get<GetTaskOffersResponse>(url).then((response) => {
        setOffers(response.data.data);
      });
    }
  }, [taskId]);

  return (
    <div aria-label="Task Offers">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Offers
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list offers on your task
          </p>
        </div>
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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Amount
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
                    Message
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {offers.map((offer) => (
                  <tr key={offer._id}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img
                            className="h-11 w-11 rounded-full"
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {"David Taing"}
                          </div>
                          {/* <div className="mt-1 text-gray-500">
                            {"adavidtaing@gmail.com"}
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-md text-gray-900">
                      ${offer.amount}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {offer.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                      {offer.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MakeOfferForm({ taskId }: { taskId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOfferPayload>({
    resolver: zodResolver(CreateOfferPayloadSchema),
  });

  const onSubmit = async (data: CreateOfferPayload) => {
    const url = `/api/tasks/${taskId}/offers`;
    const [err, result] = await to(axios.post(url, data));

    if (!err && result) {
      console.log("Successfully Created Offer");
    }
  };
  console.log({ errors });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Make an Offer
              </h1>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Amount
                    </label>
                    <div className="mt-2">
                      <input
                        type="amount"
                        id="amount"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("amount")}
                      />
                    </div>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.amount?.message as string}
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Message
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="message"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("message")}
                      />
                    </div>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.message?.message as string}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Make Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
