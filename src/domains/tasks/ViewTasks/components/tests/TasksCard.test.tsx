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

it("renders a View Offers button", () => {
  renderTaskCard();

  const viewOffersButton = screen.queryByRole("button", { name: /^view$/i });
  expect(viewOffersButton).toBeTruthy();
});

it("renders OffersList when View Offers button is clicked", async () => {
  renderTaskCard();
  const user = userEvent.setup();
  const viewOffersButton = screen.getByRole("button", { name: /^view$/i });

  await user.click(viewOffersButton);

  const offersList = screen.queryByLabelText("Offers List");
  expect(offersList).toBeTruthy();
});
