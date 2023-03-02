import { screen } from "@testing-library/react";
import { ViewOffersPage, ViewOffersPageProps } from "../ViewOffersPage";
import { renderWithPolarisTestProvider } from "src/test/utils";
import {
  ApiEventsProvider,
  InitialApiEventsState,
} from "src/common/ApiResponse/ApiEventsContext";

type setupRenderOptions = {
  componentProps?: ViewOffersPageProps;
  initialProviderState?: InitialApiEventsState;
};

function setupRender(options: setupRenderOptions = {}) {
  return renderWithPolarisTestProvider(
    <ApiEventsProvider>
      <ViewOffersPage status="authenticated" />
    </ApiEventsProvider>
  );
}

test("smoke test if it renders", () => {
  const componentProps = { status: "authenticated" } as const;

  setupRender({ componentProps });

  const viewOffersPage = screen.getByLabelText(/^view offers page$/i);
  expect(viewOffersPage).toBeTruthy();
});
