import { useSession } from "next-auth/react";
import { Card, EmptyState, Layout, Page } from "@shopify/polaris";

import { TasksPage as TaskPagePrimitive } from "@Tasks/ViewTasks";

export default function TasksPage() {
  const { status, data } = useSession();

  if (data?.user.providerId) {
    return (
      <Page title="Tasks" fullWidth>
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
      </Page>
    );
  }

  return <TaskPagePrimitive status={status} />;
}
