import { screen } from "@testing-library/react";
import { OffersTable } from "../TasksPage";

import { renderWithPolarisTestProvider } from "src/test/utils";

const renderOffersTable = () => {
  return renderWithPolarisTestProvider(<OffersTable />);
};

function setupWithTwoOffers() {
  renderOffersTable();
}

// two rows plus one for header
test("it displays three rows when given two offers", () => {
  setupWithTwoOffers();

  const rows = screen.getAllByRole("row");

  expect(rows.length).toBe(3);
});
