import { Layout, Banner } from "@shopify/polaris";
import { ComponentPropsWithRef } from "react";
import { FeatureFlag } from "./utils/FeatureFlag";

export type NotificationProps = ComponentPropsWithRef<typeof Banner>;

function BaseNotification(props: NotificationProps) {
  return (
    <Layout.Section fullWidth>
      <Banner {...props} />
    </Layout.Section>
  );
}

export default FeatureFlag(BaseNotification);
