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

  const response = await getTasksQuery({
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  return {
    props: { ...response, status: "authenticated" },
  };
};
