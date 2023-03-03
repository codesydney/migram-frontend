import { render, screen } from "@testing-library/react";

import { CheckoutPage } from "../CheckoutPage";

import { PropsWithChildren } from "react";
import {
  QueryClientWrapper,
  renderWithPolarisTestProvider,
} from "src/test/utils";
import { ElementsWrapper } from "src/components/ElementsWrapper";
import { ApiEventsProvider } from "src/common/ApiResponse/ApiEventsContext";

const ProvidersWrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ElementsWrapper>
      <ApiEventsProvider>
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </ApiEventsProvider>
    </ElementsWrapper>
  );
};

function setupRender() {
  renderWithPolarisTestProvider(
    <ProvidersWrapper>
      <CheckoutPage taskId="1" />
    </ProvidersWrapper>
  );
}

describe("CheckoutPage at /checkout/:taskId", () => {
  test("Smoke test if it renders", async () => {
    setupRender();

    expect(screen.queryByLabelText(/$checkout page^/i));
  });
});
