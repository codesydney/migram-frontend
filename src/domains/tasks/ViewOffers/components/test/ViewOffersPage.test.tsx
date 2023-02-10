import { screen } from "@testing-library/react";
import { ViewOffersPage } from "../ViewOffersPage";
import { renderWithPolarisTestProvider } from "src/test/utils";

test("smoke test if it renders", () => {
  renderWithPolarisTestProvider(<ViewOffersPage status="authenticated" />);

  const viewOffersPage = screen.getByLabelText(/^view offers page$/i);
  expect(viewOffersPage).toBeTruthy();
});
