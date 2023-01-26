import { render, screen } from "@testing-library/react";
import { TasksPage } from "../TasksPage";
import { PolarisTestProvider } from "@shopify/polaris";

test("Smoke test if it renders", () => {
  render(<TasksPage />, { wrapper: PolarisTestProvider });
  expect(screen.getByLabelText("View Tasks Page")).toBeTruthy();
});
