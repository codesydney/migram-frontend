import { Page, Layout } from "@shopify/polaris";
import { ComponentPropsWithoutRef } from "react";
import { useNotifications } from "src/common/features/notifications";
import { BaseNotification } from "./Notification";

export type PageWithNotificationsProps = ComponentPropsWithoutRef<typeof Page>;

const EventLevelToNotificationStatus = {
  info: "info",
  warn: "warning",
  error: "critical",
} as const;

export function PageWithNotifications({
  children,
  ...otherProps
}: PageWithNotificationsProps) {
  const { apiEvents, dispatchApiEvents } = useNotifications();
  const events = [...apiEvents.values()];

  return (
    <Page {...otherProps}>
      <Layout>
        {events.map((event) => (
          <BaseNotification
            key={event.id}
            title={event.title}
            status={EventLevelToNotificationStatus[event.level]}
            onDismiss={() => {
              dispatchApiEvents({
                type: "delete",
                id: event.id,
              });
            }}
          />
        ))}
        {children}
      </Layout>
    </Page>
  );
}
