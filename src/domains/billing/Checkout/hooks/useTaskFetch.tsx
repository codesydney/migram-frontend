import { useQuery } from "@tanstack/react-query";
import fetch from "node-fetch";

export const getTaskURL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks`;

export const useTaskFetch = (taskId: string) => {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const url = new URL(`${getTaskURL}/${taskId}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};
