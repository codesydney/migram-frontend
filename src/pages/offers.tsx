import { useSession } from "next-auth/react";
import { Card, EmptyState, Layout } from "@shopify/polaris";
import {
  PageWithNotifications,
} from "src/common/features/notifications";
import { ViewOffersPage } from "@Tasks/ViewOffers/components/ViewOffersPage";

export default function OffersPage() {
  const { status, data } = useSession();

  if (data?.user.customerId) {
    return (
      <PageWithNotifications title="Offers" fullWidth>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <EmptyState
                heading="This Page is not available for customers."
                image={""}
                action={{ content: "Go to Home", url: "/" }}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </PageWithNotifications>
    );
  }

  return <ViewOffersPage status={status} />;
}
