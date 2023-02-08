import { render, screen } from "@testing-library/react";

import { PolarisTestProvider } from "@shopify/polaris";

import { TaskCard } from "../TasksPage";
import userEvent from "@testing-library/user-event";

const renderTaskCard = () => {
  render(<TaskCard />, { wrapper: PolarisTestProvider });
};

test("Smoke Test if it renders", () => {
  renderTaskCard();

  const taskCard = screen.queryByLabelText("Task Card");
  expect(taskCard).toBeTruthy();
});

it("renders a 'Details' section", () => {
  renderTaskCard();

  const detailsHeading = screen.queryByRole("heading", { name: /^details$/i });
  expect(detailsHeading).toBeTruthy();
});

it("renders an 'Offers' section", () => {
  renderTaskCard();

  const offersHeading = screen.queryByRole("heading", { name: /^offers$/i });
  expect(offersHeading).toBeTruthy();
});

it("does not initially render OffersList", () => {
  renderTaskCard();

  const offersList = screen.queryByLabelText("Offers List");
  expect(offersList).toBeNull();
});
