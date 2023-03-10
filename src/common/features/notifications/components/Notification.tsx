import { Layout, Banner } from "@shopify/polaris";
import { ComponentPropsWithRef } from "react";

export type NotificationProps = ComponentPropsWithRef<typeof Banner>;

export function BaseNotification(props: NotificationProps) {
  return (
    <Layout.Section fullWidth>
      <Banner {...props} />
    </Layout.Section>
  );
}
