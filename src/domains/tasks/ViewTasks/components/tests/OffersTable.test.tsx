import { screen } from "@testing-library/react";
import { OffersTable } from "../TasksPage";

import { renderWithPolarisTestProvider } from "src/test/utils";
import { ComponentProps } from "react";

const testOffer = {
  status: "open",
  _id: "63d32618c1ec5257ad7db4f6",
  offerAmt: 205,
  comments: "Second offer hello world david",
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
  const offers = [testOffer, { ...testOffer, id: "2" }];

  renderOffersTable({ offers });
}

// one rows plus another for the header
test("it displays two rows when given one offers", () => {
  setupWithOneOffer();

  const rows = screen.getAllByRole("row");

  expect(rows.length).toBe(2);
});

// two rows plus one for the header
test("it displays three rows when given two offers", () => {
  setupWithTwoOffers();

  const rows = screen.getAllByRole("row");

  expect(rows.length).toBe(3);
});
