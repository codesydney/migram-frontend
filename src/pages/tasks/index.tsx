import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { Card, EmptyState, Layout } from "@shopify/polaris";

import {
  PageWithNotifications,
  useNotifications,
} from "src/common/features/notifications";
import { TasksPage as TaskPagePrimitive } from "@Tasks/pages/ViewTasks";
import { Task } from "@Tasks/common/types";
import { getTasksOfCustomerQuery } from "@Tasks/common/api";
import { Notification } from "../../common/features/notifications";
import { useSession } from "next-auth/react";

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
  const { status } = useSession();

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

  return <TaskPagePrimitive initialTasks={tasks} status={status} />;
}

export const getServerSideProps: GetServerSideProps<TaskRouteProps> = async ({
  req,
  res,
}) => {
  const token = await getToken({ req });
  const isCustomer = !!token?.user.customerId;

  if (!token || !isCustomer) return { props: { tasks: [], isCustomer } };

  const response = await getTasksOfCustomerQuery({
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  return { props: { ...response, isCustomer } };
};
