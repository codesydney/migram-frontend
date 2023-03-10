import { render, screen } from "@testing-library/react";
import { CheckoutForm } from "../CheckoutForm";
import { ElementsWrapper } from "src/components/ElementsWrapper";
import { renderWithPolarisTestProvider } from "src/test/utils";
import { ApiEventsProvider } from "src/common/ApiResponse/ApiEventsContext";

describe("CheckoutForm", () => {
  test("Smoke test if it renders", () => {
    renderWithPolarisTestProvider(
      <ElementsWrapper>
        <ApiEventsProvider>
          <CheckoutForm isPageLoading={false} taskId="0" />
        </ApiEventsProvider>
      </ElementsWrapper>
    );

    expect(
      screen.queryByRole("heading", { name: /^Payment Details$/i })
    ).toBeInTheDocument();
  });
});
