import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { Card, EmptyState, Layout } from "@shopify/polaris";

import {
  PageWithNotifications,
  useNotifications,
} from "src/common/features/notifications";
import { TasksPage as TaskPagePrimitive } from "@Tasks/ViewTasks";
import { Task } from "@Tasks/common/types";
import { getTasksOfCustomerQuery } from "@Tasks/common/api";
import { createNotification } from "src/common/features/notifications/utils";
import { Notification } from "../../common/features/notifications";

export type TaskRouteProps = {
  isCustomer: boolean;
  tasks: Task[];
  error?: Notification;
};

export default function TasksRoute({
  isCustomer,
  tasks,
  error,
}: TaskRouteProps) {
  const { dispatchNotifications } = useNotifications();

  if (!isCustomer) {
    return (
      <PageWithNotifications title="Tasks" fullWidth>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <EmptyState
                heading="This Page is not available for providers."
                image={""}
                action={{ content: "Go to Home", url: "/" }}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </PageWithNotifications>
    );
  }

  if (error) dispatchNotifications({ type: "set", event: error });

  return <TaskPagePrimitive initialTasks={tasks} />;
}

export const getServerSideProps: GetServerSideProps<TaskRouteProps> = async ({
  req,
  res,
}) => {
  const token = await getToken({ req });
  const isCustomer = !!token?.user.customerId;

  if (!token) {
    return { props: { tasks: [], isCustomer } };
  }

  try {
    const tasks = await getTasksOfCustomerQuery({
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    }).then((res) => res.data.data.tasks);

    return { props: { tasks, isCustomer } };
  } catch (error: any) {
    const errorNotification = createNotification({
      isError: true,
      title: `Failed to fetch tasks. Please refresh the page. If the problem persists, please contact the administrator at ${process.env.ADMIN_EMAIL}`,
      type: "notification",
      status: "critical",
      source: "Mark Task as Completed Failure",
    });

    return { props: { tasks: [], error: errorNotification, isCustomer } };
  }
};
