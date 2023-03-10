import { screen } from "@testing-library/react";

import { renderWithPolarisTestProvider } from "src/test/utils";
import {
  PageWithNotifications,
  PageWithNotificationsProps,
} from "../PageWithNotifications";
import {
  NotificationsProvider,
  InitialNotificationsState,
} from "src/common/features/notifications";
import userEvent from "@testing-library/user-event";

type SetupRenderProps = {
  componentProps?: PageWithNotificationsProps;
  initialProviderState?: InitialNotificationsState;
};

function setupRender({
  componentProps,
  initialProviderState,
}: SetupRenderProps = {}) {
  return renderWithPolarisTestProvider(
    <NotificationsProvider initialState={initialProviderState}>
      <PageWithNotifications {...componentProps} />
    </NotificationsProvider>
  );
}

test("Smoke test if BaseNotification renders", () => {
  const { baseElement } = setupRender();
  expect(baseElement).toBeInTheDocument();
});

it("does not display a notification when there are no API Events", () => {
  setupRender();

  const notification = screen.queryByText(/^test notification$/i);

  expect(notification).toBeFalsy();
});

it("displays a notification when there is an API Event", () => {
  const intialApiEventsState: InitialNotificationsState = [
    [
      "1",
      {
        id: "1",
        isError: true,
        title: "Test Notification",
        status: 400,
        statusText: "Bad Request",
        level: "error",
      },
    ],
  ] as const;

  setupRender({ initialProviderState: intialApiEventsState });

  const notification = screen.getByText(/^test notification$/i);

  expect(notification).toBeTruthy();
});

it("notification disappears when closed", async () => {
  const intialApiEventsState: InitialNotificationsState = [
    [
      "1",
      {
        id: "1",
        isError: true,
        title: "Test Notification",
        status: 400,
        statusText: "Bad Request",
        level: "error",
      },
    ],
  ] as const;

  const user = userEvent.setup();
  setupRender({ initialProviderState: intialApiEventsState });

  let notification = screen.queryByText(/^test notification$/i);

  expect(notification).toBeTruthy();

  const dismissNotificationButton = screen.getByLabelText(
    /^dismiss notification$/i
  );

  await user.click(dismissNotificationButton);

  notification = screen.queryByText(/^test notification$/i);

  expect(notification).toBeFalsy();
});
