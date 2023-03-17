import { Page, Layout, Toast } from "@shopify/polaris";
import { ComponentPropsWithoutRef } from "react";
import { useNotifications } from "src/common/features/notifications";
import { BaseNotification } from "./Notification";

export type PageWithNotificationsProps = ComponentPropsWithoutRef<typeof Page>;

export function PageWithNotifications({
  children,
  ...otherProps
}: PageWithNotificationsProps) {
  const { apiEvents, dispatchApiEvents } = useNotifications();
  const events = [...apiEvents.values()];

  return (
    <Page {...otherProps}>
      <Layout>
        {events
          .filter((i) => i.type === "notification")
          .map((event) => (
            <BaseNotification
              key={event.id}
              title={event.title}
              status={event.status}
              onDismiss={() => {
                dispatchApiEvents({
                  type: "delete",
                  id: event.id,
                });
              }}
            />
          ))}
        {children}

        {events
          .filter((i) => i.type === "toast")
          .map((event) => (
            <Toast
              key={event.id}
              content={event.title}
              error={event.isError}
              onDismiss={() => {
                dispatchApiEvents({
                  type: "delete",
                  id: event.id,
                });
              }}
            />
          ))}
      </Layout>
    </Page>
  );
}
