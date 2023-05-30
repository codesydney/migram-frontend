import clsx from "clsx";

import { TaskStatus } from "@/types/schemas/Task";

export type TaskStatusBadgeProps = {
  status: TaskStatus;
};

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  let className = "";
  const baseClasses =
    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium";

  switch (status) {
    case "Open":
      className = clsx(baseClasses, "bg-blue-100 text-blue-700");
      break;
    case "In Progress":
      className = clsx(baseClasses, "bg-green-100 text-green-700");
      break;
    case "Completed":
      className = clsx(baseClasses, "bg-pink-100 text-pink-700");
      break;
  }

  return <span className={className}>{status}</span>;
}
