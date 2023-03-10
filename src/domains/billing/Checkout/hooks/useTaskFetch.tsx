import { useQuery } from "@tanstack/react-query";
import fetch from "node-fetch";
import { useApiEvents } from "src/common/ApiResponse/ApiEventsContext";
import { createApiEvent } from "../utils";

export const getTaskURL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`;

export const useTaskFetch = (taskId: string) => {
  const { dispatchApiEvents } = useApiEvents();

  return useQuery({
    retry: false,
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const url = new URL(`${getTaskURL}/${taskId}`);
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data.data.task;
    },
    onError: (error: Error) => {
      dispatchApiEvents({
        type: "set",
        event: createApiEvent({ message: error.message }),
      });
    },
  });
};
