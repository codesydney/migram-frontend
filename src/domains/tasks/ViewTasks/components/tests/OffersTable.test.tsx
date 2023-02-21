import { ComponentProps } from "react";
import { getAllByRole, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { OffersTable } from "../OffersTable";

import { renderWithPolarisTestProvider } from "src/test/utils";
import { Offer } from "@Tasks/common/types";

const testOffer = {
  status: "open" as const,
  offerAmt: 205,
  comments: "first offer",
  providerId: "acct_1Lur4rIWxYvLVjGY",
  task: "63d26e6651167241c5f238a4",
  id: "63d32618c1ec5257ad7db4f6",
};

function renderOffersTable(props: ComponentProps<typeof OffersTable>) {
  return renderWithPolarisTestProvider(<OffersTable {...props} />);
}

function setupWithOneOffer() {
  const offers: Array<Offer> = [testOffer];

  return renderOffersTable({ offers });
}

function setupWithTwoOffers() {
  const offers = [
    testOffer,
    { ...testOffer, id: "2", comments: "Second Offer" },
  ];

  return renderOffersTable({ offers });
}

test("Smoke test if it renders", () => {
  const { baseElement } = setupWithOneOffer();

  expect(baseElement).toBeInTheDocument();
});

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

test("checkbox is checked when a offer is clicked", async () => {
  setupWithOneOffer();

  const user = userEvent.setup();
  const offerDescription = screen.getByText(/^first offer$/i);

  await user.click(offerDescription);

  const tableBody = document.querySelector("tbody") as HTMLElement;
  const checkboxes = getAllByRole(tableBody, "checkbox", {
    checked: true,
  });

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

it("displays an 'Accept Offer' button when an offer is clicked", async () => {
  setupWithTwoOffers();

  const user = userEvent.setup();
  const firstOfferDescription = screen.getByText(/^first offer$/i);

  await user.click(firstOfferDescription);

  const acceptOfferButton = screen.queryByRole("button", {
    name: /^Accept Offer$/i,
  });

  expect(acceptOfferButton).toBeTruthy();
});
