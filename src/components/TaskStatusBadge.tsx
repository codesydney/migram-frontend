import { TaskStatus } from "@/types/schemas/Task";

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
