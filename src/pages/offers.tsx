import { Card, EmptyState, Layout } from "@shopify/polaris";
import {
  Notification,
  PageWithNotifications,
  useNotifications,
} from "src/common/features/notifications";
import { ViewOffersPage } from "@Tasks/pages/ViewOffers/";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { Offer } from "@Tasks/common/types";
import { getOffersOfProviderQuery } from "@Tasks/common/api";

export type OffersRouteProps = {
  status: "authenticated" | "unauthenticated";
  isProvider: boolean;
  offers: Offer[];
  error?: Notification;
};

export default function OffersRoute({
  isProvider,
  offers,
  error,
}: OffersRouteProps) {
  const { dispatchNotifications } = useNotifications();

  if (error) dispatchNotifications({ type: "set", event: error });

  if (!isProvider) {
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

  return <ViewOffersPage initialOffers={offers} />;
}

export const getServerSideProps: GetServerSideProps<OffersRouteProps> = async ({
  req,
  res,
}) => {
  const token = await getToken({ req });
  const isProvider = !!token?.user.providerId;

  if (!token)
    return { props: { status: "unauthenticated", isProvider, offers: [] } };

  if (!isProvider)
    return { props: { status: "authenticated", isProvider, offers: [] } };

  const response = await getOffersOfProviderQuery({
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  return { props: { ...response, status: "authenticated", isProvider } };
};
