import { render, screen } from "@testing-library/react";

import { PolarisTestProvider } from "@shopify/polaris";

import { TaskCard } from "../TasksPage";

test("Smoke Test if it renders", () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
  expect(screen.getByLabelText("Task Card")).toBeTruthy();
});

test("Renders a 'Details' section", () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
  expect(screen.getByRole("heading", { name: /^details$/i })).toBeTruthy();
});

test("Renders an 'Offers' section", () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
  expect(screen.getByRole("heading", { name: /^offers$/i })).toBeTruthy();
});
