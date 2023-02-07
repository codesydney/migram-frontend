import { render, screen } from "@testing-library/react";

import { PolarisTestProvider } from "@shopify/polaris";

import { TaskCard } from "../TasksPage";

test("Smoke Test if it renders", () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
  expect(screen.getByLabelText("Task Card")).toBeTruthy();
});

it("renders a 'Details' section", () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
  expect(screen.getByRole("heading", { name: /^details$/i })).toBeTruthy();
});

it("renders an 'Offers' section", () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
  expect(screen.getByRole("heading", { name: /^offers$/i })).toBeTruthy();
});

it("renders a View Offers button", () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
  expect(screen.getByRole("button", { name: /^view$/i })).toBeTruthy();
});
