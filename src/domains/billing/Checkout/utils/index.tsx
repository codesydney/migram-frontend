import { v4 as uuid } from "uuid";

import { Notification } from "src/common/features/notifications";

export function createApiEvent({
  id = uuid(),
  message,
}: {
  id?: string;
  message: string;
}): Notification {
  return {
    id: id,
    isError: true,
    title: message,
    status: 500,
    statusText: "",
    level: "error",
  } as const;
}
