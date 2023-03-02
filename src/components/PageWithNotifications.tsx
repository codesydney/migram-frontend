import React from "react";
import { Page, Layout } from "@shopify/polaris";
import { ComponentPropsWithoutRef } from "react";
import { useApiEvents } from "src/common/ApiResponse/ApiEventsContext";
import { BaseNotification } from "./Notification";

export type PageWithNotificationsProps = ComponentPropsWithoutRef<typeof Page>;

export function PageWithNotifications({
  children,
  ...otherProps
}: PageWithNotificationsProps) {
  const { apiEvents } = useApiEvents();
  const events = [...apiEvents.values()];

  return (
    <Page {...otherProps}>
      <Layout>
        {events.map((event) => (
          <BaseNotification
            key={event.id}
            title={event.title}
            status="critical"
          />
        ))}
        {children}
      </Layout>
    </Page>
  );
}
