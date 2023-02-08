import { screen } from "@testing-library/react";
import { OffersTable } from "../TasksPage";

import { renderWithPolarisTestProvider } from "src/test/utils";
import { ComponentProps } from "react";

function renderOffersTable(props: ComponentProps<typeof OffersTable>) {
  return renderWithPolarisTestProvider(<OffersTable {...props} />);
}

function setupWithOneOffer() {
  const offers = [{}];

  renderOffersTable({ offers });
}

function setupWithTwoOffers() {
  const offers = [{}, {}];

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
