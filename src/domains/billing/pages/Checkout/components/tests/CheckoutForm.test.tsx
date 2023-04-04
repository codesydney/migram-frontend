import { screen } from "@testing-library/react";
import { CheckoutForm } from "../CheckoutForm";
import { ElementsWrapper } from "src/common/components/ElementsWrapper";
import { renderWithPolarisTestProvider } from "src/test/utils";
import { NotificationsProvider } from "src/common/features/notifications";

describe("CheckoutForm", () => {
  test("Smoke test if it renders", () => {
    renderWithPolarisTestProvider(
      <ElementsWrapper>
        <NotificationsProvider>
          <CheckoutForm isPageLoading={false} taskId="0" />
        </NotificationsProvider>
      </ElementsWrapper>
    );

    expect(
      screen.queryByRole("heading", { name: /^Payment Details$/i })
    ).toBeInTheDocument();
  });
});
