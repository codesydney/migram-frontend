import { render, screen } from "@testing-library/react";
import { ElementsWrapper } from "../../../components/utils/ElementsWraper";
import { CheckoutForm } from "../CheckoutForm";

describe("CheckoutForm", () => {
  test("Smoke test if it renders", () => {
    render(<CheckoutForm isPageLoading={false} taskId="0" />, {
      wrapper: ElementsWrapper,
    });

    expect(
      screen.queryByRole("form", { name: /^checkout form$/i })
    ).toBeTruthy();
  });
});
