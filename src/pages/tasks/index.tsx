import { useSession } from "next-auth/react";
import { Card, EmptyState, Layout } from "@shopify/polaris";
import {
  PageWithNotifications,
} from "src/common/features/notifications";
import { TasksPage as TaskPagePrimitive } from "@Tasks/ViewTasks";

export default function TasksPage() {
  const { status, data } = useSession();

  if (data?.user.providerId) {
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

  return <TaskPagePrimitive status={status} />;
}
