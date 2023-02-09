import { ComponentProps } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { OffersTable } from "../TasksPage";

import { renderWithPolarisTestProvider } from "src/test/utils";

const testOffer = {
  status: "open",
  _id: "63d32618c1ec5257ad7db4f6",
  offerAmt: 205,
  comments: "first offer",
  providerId: "acct_1Lur4rIWxYvLVjGY",
  task: "63d26e6651167241c5f238a4",
  createdAt: "2023-01-27T01:17:12.653Z",
  updatedAt: "2023-01-27T01:17:12.653Z",
  __v: 0,
  timeElapsed: "12 days ago",
  id: "63d32618c1ec5257ad7db4f6",
};

function renderOffersTable(props: ComponentProps<typeof OffersTable>) {
  return renderWithPolarisTestProvider(<OffersTable {...props} />);
}

function setupWithOneOffer() {
  const offers = [testOffer];

  renderOffersTable({ offers });
}

function setupWithTwoOffers() {
  const offers = [
    testOffer,
    { ...testOffer, id: "2", comments: "Second Offer" },
  ];

  renderOffersTable({ offers });
}

// one rows plus another for the header
it("displays two rows when given one offers", () => {
  setupWithOneOffer();

  const rows = screen.getAllByRole("row");

  expect(rows.length).toBe(2);
});

// two rows plus one for the header
it("displays three rows when given two offers", () => {
  setupWithTwoOffers();

  const rows = screen.getAllByRole("row");

  expect(rows.length).toBe(3);
});

test("checkbox is checked when a row is clicked", async () => {
  setupWithOneOffer();

  const user = userEvent.setup();
  const offerDescription = screen.getByText(/^first offer$/i);

  await user.click(offerDescription);

  const checkboxes = screen.getAllByRole("checkbox", { checked: true });

  expect(checkboxes.length).toBe(1);
});

it("only allows one row to be selected at a time", async () => {
  setupWithTwoOffers();

  const user = userEvent.setup();
  const firstOfferDescription = screen.getByText(/^first offer$/i);
  const secondOfferDescription = screen.getByText(/^second offer$/i);

  await user.click(firstOfferDescription);
  await user.click(secondOfferDescription);

  const checkbox = screen.getByRole("checkbox", { checked: true });

  expect(checkbox).toBeChecked();
});
