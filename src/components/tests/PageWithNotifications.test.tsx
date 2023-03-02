import { render, screen } from "@testing-library/react";

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
