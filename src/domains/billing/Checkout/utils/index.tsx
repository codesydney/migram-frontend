import { v4 as uuid } from "uuid";

import { ApiEvent } from "src/common/features/notifications";

export function createApiEvent({
  id = uuid(),
  message,
}: {
  id?: string;
  message: string;
}): ApiEvent {
  return {
    id: id,
    isError: true,
    title: message,
    status: 500,
    statusText: "",
    level: "error",
  } as const;
}
