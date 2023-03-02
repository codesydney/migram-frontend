import { screen } from "@testing-library/react";
import { ViewOffersPage } from "../ViewOffersPage";
import { renderWithPolarisTestProvider } from "src/test/utils";
import { ApiEventsProvider } from "src/common/ApiResponse/ApiEventsContext";

test("smoke test if it renders", () => {
  renderWithPolarisTestProvider(
    <ApiEventsProvider>
      <ViewOffersPage status="authenticated" />
    </ApiEventsProvider>
  );

  const viewOffersPage = screen.getByLabelText(/^view offers page$/i);
  expect(viewOffersPage).toBeTruthy();
});
