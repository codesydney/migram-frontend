import { render, screen } from "@testing-library/react";
import { PolarisTestProvider } from "@shopify/polaris";

import { OffersSection } from "../TasksPage";
import userEvent from "@testing-library/user-event";

const renderOffersSection = () => {
  render(<OffersSection />, { wrapper: PolarisTestProvider });
};

it("renders a View Offers button", () => {
  renderOffersSection();

  const viewOffersButton = screen.queryByRole("button", { name: /^view$/i });
  expect(viewOffersButton).toBeTruthy();
});

it("renders OffersList when View Offers button is clicked", async () => {
  renderOffersSection();
  const user = userEvent.setup();
  const viewOffersButton = screen.getByRole("button", { name: /^view$/i });

  await user.click(viewOffersButton);

  const offersList = screen.queryByLabelText("Offers List");
  expect(offersList).toBeTruthy();
});
