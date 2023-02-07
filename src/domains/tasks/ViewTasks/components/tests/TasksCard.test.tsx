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

test("Renders a View Offers button", () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
  expect(screen.getByRole("button", { name: /^view$/i })).toBeTruthy();
});
