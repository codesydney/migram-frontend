import React from "react";
import { Page, Layout } from "@shopify/polaris";
import { ComponentPropsWithoutRef } from "react";
import { useApiEvents } from "src/common/ApiResponse/ApiEventsContext";
import { BaseNotification } from "./Notification";

export type PageWithNotificationsProps = ComponentPropsWithoutRef<
  typeof Page
> & {
  notification?: () => React.ReactNode;
};

export function PageWithNotifications({
  children,
  notification,
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

        {notification ? notification() : null}
        {children}
      </Layout>
    </Page>
  );
}
