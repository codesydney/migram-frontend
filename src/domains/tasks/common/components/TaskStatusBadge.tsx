import { TaskStatus } from "@Tasks/common/types";
import { Badge } from "@shopify/polaris";
import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";

/**
 * Maps the Task Status to the Polaris Status
 */
export const TaskStatusMap = {
  open: "success",
  assigned: "info",
  completed: "attention",
  paid: "info",
  pay_decline: "critical",
  pay_in_processing: "info",
} as const;

export type TaskStatusBadgeProps = {
  status: TaskStatus;
};

export const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  const badgeStatus = TaskStatusMap[status] as Status;

  return <Badge status={badgeStatus}>{status}</Badge>;
};
