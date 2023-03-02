import { screen } from "@testing-library/react";

import { BaseNotification } from "../Notification";
import { renderWithPolarisTestProvider } from "src/test/utils";
import {
  PageWithNotifications,
  PageWithNotificationsProps,
} from "../PageWithNotifications";
import { ApiEventsProvider } from "src/common/ApiResponse/ApiEventsContext";

function setupRender(componentProps?: PageWithNotificationsProps) {
  return renderWithPolarisTestProvider(
    <ApiEventsProvider>
      <PageWithNotifications {...componentProps} />
    </ApiEventsProvider>
  );
}

test("Smoke test if BaseNotification renders", () => {
  const { baseElement } = setupRender();
  expect(baseElement).toBeInTheDocument();
});

it("displays a notification if one is passed in", () => {
  setupRender({
    notification: () => <BaseNotification title="You done messed up" />,
  });

  const notificationHeading = screen.getByText("You done messed up");

  expect(notificationHeading).toBeTruthy();
});
