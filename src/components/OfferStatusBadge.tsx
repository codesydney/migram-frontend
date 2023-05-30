import clsx from "clsx";

import { Offer } from "@/types/schemas/Offer";

export function OfferStatusBadge({ status }: { status: Offer["status"] }) {
  let className = "";
  const baseClasses =
    "inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium ring-1 ring-inset";

  switch (status) {
    case "Pending":
      className = clsx(
        baseClasses,
        "bg-gray-50 text-gray-600 ring-gray-500/10"
      );
      break;
    case "Accepted":
      className = clsx(
        baseClasses,
        "bg-green-50 text-green-700 ring-green-600/20"
      );
      break;
    case "Completed":
      className = clsx(
        baseClasses,
        "bg-blue-50 text-blue-700  ring-blue-700/10"
      );
      break;
    case "Rejected":
      className = clsx(baseClasses, "bg-red-50 text-red-700 ring-red-600/10");
      break;
    default:
      className = clsx(
        baseClasses,
        "bg-gray-50 text-gray-600 ring-gray-500/10"
      );
      break;
  }

  return <span className={className}>{status}</span>;
}
