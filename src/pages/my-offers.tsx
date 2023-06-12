import { useEffect, useState } from "react";

import { Task } from "@/types/schemas/Task";
import { TaskStatusBadge } from "@/components/TaskStatusBadge";
import axios from "axios";
import { Offer } from "@/types/schemas/Offer";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";

export type MyOffer = Omit<Offer, "task"> & { task: Task };

export default function MyTasksPage() {
  const [myOffers, setMyOffers] = useState<MyOffer[]>([]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/my-offers`;
    axios.get(url).then((response) => {
      const offers = response.data.data;

      setMyOffers(offers);
    });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="inline-block text-2xl font-bold tracking-tight text-gray-900">
            My Offers
          </h2>
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
                      Customer
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {myOffers.map((offer) => (
                    <tr key={offer._id}>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">
                          <a
                            href={`/tasks/${offer.task._id}`}
                            className="underline hover:text-indigo-600"
                          >
                            {offer.task.shortDescription}
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <TaskStatusBadge status={offer.task.status} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <PaymentStatusBadge status={offer.task.paymentStatus} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        ${offer.task.budget}.00
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                        ${offer.amount}.00
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900"></td>
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
