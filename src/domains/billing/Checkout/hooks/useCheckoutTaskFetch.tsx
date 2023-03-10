import { useQuery } from "@tanstack/react-query";
import { useNotifications } from "src/common/features/notifications";
import axios from "axios";
import { createNotification } from "src/common/features/notifications/utils";

export const getCheckoutTaskURL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/checkout`;

export const useCheckoutTaskFetch = (taskId: string) => {
  const { dispatchApiEvents } = useNotifications();

  return useQuery({
    retry: false,
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const url = new URL(`${getCheckoutTaskURL}/${taskId}`);

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
        event: createNotification({
          isError: true,
          title: error.message,
          type: "notification",
          status: "warning",
          source: "Api Error",
        }),
      });
    },
  });
};
