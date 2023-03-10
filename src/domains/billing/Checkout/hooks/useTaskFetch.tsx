import { useQuery } from "@tanstack/react-query";
import { useApiEvents } from "src/common/ApiResponse/ApiEventsContext";
import { createApiEvent } from "../utils";
import axios from "axios";

export const getTaskURL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`;

export const useTaskFetch = (taskId: string) => {
  const { dispatchApiEvents } = useApiEvents();

  return useQuery({
    retry: false,
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const url = new URL(`${getTaskURL}/${taskId}`);

      const task = await axios
        .get(url.toString())
        .then((res) => res.data.data.task)
        .catch((err) => {
          throw new Error(err.response.data.message);
        });

      return task;
    },
    onError: (error: Error) => {
      dispatchApiEvents({
        type: "set",
        event: createApiEvent({ message: error.message }),
      });
    },
  });
};
