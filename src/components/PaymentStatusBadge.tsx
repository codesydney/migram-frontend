import clsx from "clsx";

import { PaymentStatus } from "@/types/schemas/Task";

export type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  let className = "";
  const baseClasses =
    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium";

  switch (status) {
    case "N/A":
      className = clsx(baseClasses, "bg-gray-100 text-gray-600");
      break;
    case "Payment Due":
      className = clsx(baseClasses, "bg-yellow-100 text-yellow-800");
      break;
    case "Payment Declined":
      className = clsx(baseClasses, "bg-pink-100 text-pink-700");
      break;
    case "Paid":
      className = clsx(baseClasses, "bg-green-100 text-green-700");
      break;
  }

  return <span className={className}>{status}</span>;
}
