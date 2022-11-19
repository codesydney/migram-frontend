import { useQuery } from "@tanstack/react-query";
import fetch from "node-fetch";

export const fetchURL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/`;

export const useTaskFetch = (taskId: string) => {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await fetch(fetchURL + taskId);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};
