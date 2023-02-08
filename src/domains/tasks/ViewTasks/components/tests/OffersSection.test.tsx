import { render, screen } from "@testing-library/react";
import { PolarisTestProvider } from "@shopify/polaris";

import { OffersSection } from "../TasksPage";
import userEvent from "@testing-library/user-event";

const renderOffersSection = () => {
  return render(<OffersSection />, { wrapper: PolarisTestProvider });
};

test("Smoke test if it renders", () => {
  const { baseElement } = renderOffersSection();

  expect(baseElement).toBeInTheDocument();
});

it("renders a View Offers button", () => {
  renderOffersSection();

  const viewOffersButton = screen.queryByRole("button", { name: /^view$/i });
  expect(viewOffersButton).toBeTruthy();
});

it("renders OffersTable when View Offers button is clicked", async () => {
  renderOffersSection();
  const user = userEvent.setup();
  const viewOffersButton = screen.getByRole("button", { name: /^view$/i });

  await user.click(viewOffersButton);

  const offersList = screen.queryByLabelText("Offers Table");
  expect(offersList).toBeTruthy();
});
