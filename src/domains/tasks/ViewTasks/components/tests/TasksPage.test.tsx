import { render, screen } from "@testing-library/react";
import { PolarisTestProvider } from "@shopify/polaris";

import { TasksPage } from "../TasksPage";

test("Smoke Test if it renders", () => {
  render(<TasksPage />, { wrapper: PolarisTestProvider });
  expect(screen.getByLabelText("Customer Tasks Page")).toBeTruthy();
});

test("It renders TaskCard as a child", () => {
  render(<TasksPage />, { wrapper: PolarisTestProvider });
  expect(screen.getByLabelText("Task Card")).toBeTruthy();
});
