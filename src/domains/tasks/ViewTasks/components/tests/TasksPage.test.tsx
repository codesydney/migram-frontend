import { screen } from "@testing-library/react";

import { TasksPage } from "../TasksPage";

import { renderWithPolarisTestProvider } from "src/test/utils";
import { NotificationsProvider } from "src/common/features/notifications";

async function setupRender() {
  return renderWithPolarisTestProvider(
    <NotificationsProvider>
      <TasksPage initialTasks={[]} status="authenticated" />
    </NotificationsProvider>
  );
}

test("Smoke Test if it renders", () => {
  setupRender();
  expect(screen.getByLabelText("Customer Tasks Page")).toBeTruthy();
});
