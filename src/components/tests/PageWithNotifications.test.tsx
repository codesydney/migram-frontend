import { screen } from "@testing-library/react";

import {
  PageWithNotifications,
  PageWithNotificationsProps,
} from "../PageWithNotifications";
import { BaseNotification } from "..";

import { renderWithPolarisTestProvider } from "src/test/utils";

function setupRender(componentProps?: PageWithNotificationsProps) {
  return renderWithPolarisTestProvider(
    <PageWithNotifications {...componentProps} />
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
