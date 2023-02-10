import { CategoryStatusMap, TaskStatus } from "@Tasks/common/types";
import { Badge } from "@shopify/polaris";
import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";

export type TaskStatusBadgeProps = {
  status: TaskStatus;
};

export const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  const badgeStatus = CategoryStatusMap[status] as Status;

  return <Badge status={badgeStatus}>{status}</Badge>;
};
