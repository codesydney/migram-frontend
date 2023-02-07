import { render, screen } from "@testing-library/react";

import { PolarisTestProvider } from "@shopify/polaris";

import { TaskCard } from "../TasksPage";

const renderTaskCard = () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
};

test("Smoke Test if it renders", () => {
  renderTaskCard();
  expect(screen.getByLabelText("Task Card")).toBeTruthy();
});

it("renders a 'Details' section", () => {
  renderTaskCard();
  expect(screen.getByRole("heading", { name: /^details$/i })).toBeTruthy();
});

it("renders an 'Offers' section", () => {
  renderTaskCard();
  expect(screen.getByRole("heading", { name: /^offers$/i })).toBeTruthy();
});

it("renders a View Offers button", () => {
  renderTaskCard();
  expect(screen.getByRole("button", { name: /^view$/i })).toBeTruthy();
});
