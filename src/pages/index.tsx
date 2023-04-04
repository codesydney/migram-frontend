import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";

import { ListingsPage } from "@Tasks/ViewListings";
import { getTasksQuery } from "@Tasks/common/api";
import { Task } from "@Tasks/common/types";

import {
  Notification,
  createNotification,
  useNotifications,
} from "../common/features/notifications";

export type ListingsRouteProps = {
  tasks: Task[];
  status: "authenticated" | "loading" | "unauthenticated";
  error?: Notification;
};

export default function ListingsRoute({
  tasks,
  status,
  error,
}: ListingsRouteProps) {
  const { dispatchNotifications } = useNotifications();

  if (error) dispatchNotifications({ type: "set", event: error });

  return <ListingsPage initialTasks={tasks} status={status} />;
}

export const getServerSideProps: GetServerSideProps<
  ListingsRouteProps
> = async ({ req, res }) => {
  const token = await getToken({ req });

  if (!token) {
    return { props: { tasks: [], status: "unauthenticated" } };
  }

  try {
    const tasks = await getTasksQuery({
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    }).then((res) => res.data.data.tasks);

    return {
      props: { tasks: tasks, status: "authenticated" },
    };
  } catch (err: any) {
    const event = createNotification({
      status: "critical",
      isError: true,
      title: `Failed to fetch tasks. Please refresh the page. If the problem persists, please contact the administrator at ${process.env.ADMIN_EMAIL}`,
      type: "notification",
      source: "",
    });

    return {
      props: { tasks: [], status: "authenticated", event },
    };
  }
};
