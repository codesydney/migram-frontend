import { render, screen } from "@testing-library/react";
import { CheckoutForm } from "../CheckoutForm";
import { ElementsWrapper } from "src/components/ElementsWrapper";
import { renderWithPolarisTestProvider } from "src/test/utils";

describe("CheckoutForm", () => {
  test("Smoke test if it renders", () => {
    renderWithPolarisTestProvider(
      <ElementsWrapper>
        <CheckoutForm isPageLoading={false} taskId="0" />
      </ElementsWrapper>
    );

    expect(
      screen.queryByRole("heading", { name: /^Payment Details$/i })
    ).toBeInTheDocument();
  });
});
