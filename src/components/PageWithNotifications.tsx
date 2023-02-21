import { Page, Layout } from "@shopify/polaris";
import { ComponentPropsWithoutRef } from "react";

export type PageWithNotificationsProps = ComponentPropsWithoutRef<
  typeof Page
> & {
  notification?: React.ReactNode;
};

export function PageWithNotifications({
  children,
  notification,
  ...otherProps
}: PageWithNotificationsProps) {
  return (
    <Page {...otherProps}>
      <Layout>
        {notification}
        {children}
      </Layout>
    </Page>
  );
}
