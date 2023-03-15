import { screen, render } from "@testing-library/react";

import { CreateTaskPage } from "../CreateTaskPage";
import { renderWithPolarisTestProvider } from "src/test/utils";
import { NotificationsProvider } from "src/common/features/notifications";

async function setupRender() {
  return renderWithPolarisTestProvider(
    <NotificationsProvider>
      <CreateTaskPage />
    </NotificationsProvider>
  );
}

test("Smoke test if CreateTaskPage renders", () => {
  setupRender();
  expect(screen.getByLabelText("Create Task Page")).toBeTruthy();
});
