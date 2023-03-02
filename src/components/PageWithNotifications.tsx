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
  const events = [...apiEvents.entries()];

  return (
    <Page {...otherProps}>
      <Layout>
        {events.map(([eventId, event]) => (
          <BaseNotification
            key={eventId}
            title={event.title}
            status="critical"
          />
        ))}
        {children}
      </Layout>
    </Page>
  );
}
