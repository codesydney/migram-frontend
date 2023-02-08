import { render, screen } from "@testing-library/react";

import { PolarisTestProvider } from "@shopify/polaris";

import { TaskCard } from "../TasksPage";

test("Smoke Test if it renders", () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
  expect(screen.getByLabelText("Task Card")).toBeTruthy();
});
