import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import { useRouter } from "next/router";

import to from "await-to-js";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import pino from "pino";
import { useForm } from "react-hook-form";

import {
  CreateOfferPayload,
  CreateOfferPayloadSchema,
  GetTaskOffersResponse,
  Offer,
  TaskOffer,
} from "@/types/schemas/Offer";
import { GetTaskResponse, Task } from "@/types/schemas/Task";
import { useMigramUser } from "@/hooks";
import { TaskStatusBadge } from "@/components/TaskStatusBadge";
import { OfferStatusBadge } from "@/components/OfferStatusBadge";
import { PrimaryButton } from "@/components/PrimaryButton";
import { MakePaymentButton } from "@/components/MakePaymentButton";

const logger = pino({ name: "TaskItemPage" });

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

export type TaskDetialsContext = {
  task?: Task;
  setTask: (task: Task) => void;
  isTaskOwner: boolean;
  hasAcceptedOffer: boolean;
};

const TaskDetailsContext = createContext<TaskDetialsContext | undefined>(
  undefined
);

export function TaskDetailsProvider({ children }: PropsWithChildren<{}>) {
  return { children };
}

export function useTaskDetails() {
  const context = useContext(TaskDetailsContext);

  if (!context) {
    throw new Error("useTaskDetials must be used within TaskDetailsProvider");
  }

  return context;
}

export default function TaskItemPage() {
  const [task, setTask] = useState<Task | undefined>();
  const { customerId, isProvider, serviceProviderId } = useMigramUser();
  const router = useRouter();

  const id = router.query.id as string;
  const hasAcceptedOffer = !!task?.acceptedOffer;
  const isTaskOwner = customerId === task?.customerId;

  useEffect(() => {
    if (id) {
      queryTaskById(id).then((task) => {
        if (task) setTask(task);
      });
    }
  }, [id]);

  if (!task) {
    // TODO handle loading state
    return <div>Loading</div>;
  }

  return (
    <TaskDetailsContext.Provider
      value={{ task, setTask, isTaskOwner, hasAcceptedOffer }}
    >
      <div className="bg-white">
        <div className="flex flex-col gap-10 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:gap-20 lg:max-w-7xl lg:px-8">
          <TaskDetails task={task} />
          {task.acceptedOffer && (
            <AcceptedOfferDetails
              offerId={task.acceptedOffer}
              serviceProviderId={serviceProviderId}
            />
          )}
          <TaskOffersTable taskId={task._id} />
          {isProvider && <MakeOfferForm taskId={task._id} />}
        </div>
      </div>
    </TaskDetailsContext.Provider>
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
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          <TaskStatusBadge status={task.status} />
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Budget
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {task.budget && `$${task.budget}`}
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

export function TaskOffersTable({ taskId }: { taskId: string }) {
  const [offers, setOffers] = useState(new Array<TaskOffer>());
  const { hasAcceptedOffer, isTaskOwner } = useTaskDetails();
  const showApproveButtons = isTaskOwner && !hasAcceptedOffer;

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
                  <OfferTableRow
                    key={offer._id}
                    offer={offer}
                    showApproveButton={showApproveButtons}
                  />
                ))}
                {offers.length === 0 ? (
                  <tr key="no-offers">
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      Looks like there are no offers yet. Be the first to make
                      an offer.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export type OfferTableRowProps = {
  offer: TaskOffer;
  showApproveButton: boolean;
};

export function OfferTableRow({
  offer,
  showApproveButton,
}: OfferTableRowProps) {
  const onClick = async () => {
    const url = `/api/offers/${offer._id}/approve`;

    const [err, response] = await to(axios.post(url));

    if (err || !response) {
      alert("Something went wrong");
      logger.info({ err });
      return;
    }

    window.location.reload();
  };

  return (
    <tr>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="h-11 w-11 flex-shrink-0">
            <img
              className="h-11 w-11 rounded-full"
              src={offer.contactPhoto}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{offer.contactName}</div>
            <div className="mt-1 text-gray-500">{offer.contactEmail}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-md text-gray-900">
        {offer.amount && `$${offer.amount}`}
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        <OfferStatusBadge status={offer.status} />
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
        {offer.message}
      </td>

      {showApproveButton && (
        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
          <PrimaryButton onClick={onClick}>Approve</PrimaryButton>
        </td>
      )}
    </tr>
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
      window.location.reload();
    }
  };

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

export type GetOfferResponse = {
  data: Offer;
};

export type AcceptedOfferDetailsProps = {
  offerId: string;
  serviceProviderId?: string;
};

export function AcceptedOfferDetails({
  offerId,
  serviceProviderId,
}: AcceptedOfferDetailsProps) {
  const router = useRouter();
  const [acceptedOffer, setAcceptedOffer] = useState<Offer | undefined>();
  const isOfferOwner = serviceProviderId === acceptedOffer?.serviceProviderId;
  const isOfferCompleted = acceptedOffer?.status === "Completed";
  const showMarkCompleteButton = isOfferOwner && !isOfferCompleted;

  const onMarkTaskCompleteClick = async () => {
    if (!isOfferOwner)
      throw new Error("Only the offer owner can mark the task as complete");

    const url = `/api/offers/${offerId}/complete`;
    const [err, response] = await to(axios.post(url));

    if (err || !response) {
      alert("Something went wrong");
      logger.info({ err });
      return;
    }

    window.location.reload();
  };

  const onMakePaymentClick = async () => {
    router.push(`/checkout/${acceptedOffer?.task}`);
  };

  useEffect(() => {
    const url = `/api/offers/${offerId}`;
    axios.get<GetOfferResponse>(url).then((response) => {
      setAcceptedOffer(response.data.data);
    });
  }, []);

  return (
    <div aria-label="Task Offers">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Accepted Offer
          </h1>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Status
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {acceptedOffer && (
                <OfferStatusBadge status={acceptedOffer.status} />
              )}
            </dd>
          </div>
          <div className="items-center px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Service Provider
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex items-center">
                <div className="h-11 w-11 flex-shrink-0">
                  <img
                    className="h-11 w-11 rounded-full"
                    src={acceptedOffer?.contactPhoto}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {acceptedOffer?.contactName}
                  </div>
                  <div className="mt-1 text-gray-500">
                    {acceptedOffer?.contactEmail}
                  </div>
                </div>
              </div>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Short Description
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {acceptedOffer?.message}
            </dd>
          </div>
          {showMarkCompleteButton && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900"></dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={onMarkTaskCompleteClick}
                >
                  Mark as Complete
                </button>
              </dd>
            </div>
          )}
          {isOfferCompleted && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900"></dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <MakePaymentButton taskId={acceptedOffer.task} />
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
