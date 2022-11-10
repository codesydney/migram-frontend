import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutPage from "../../pages/checkout/[taskId]";
import { useRouter } from "next/router";

jest.mock("next/router", () => require("next-router-mock"));

describe("CheckoutPage", () => {
  test("it validates billing details", async () => {
    const user = userEvent.setup();
    const container = render(<CheckoutPage />);

    const checkoutButton = container.getByText(/checkout/i, {
      selector: "button",
    });

    await act(async () => user.click(checkoutButton));

    expect(container.getByText(/please enter address line 1/i)).toBeTruthy();
  });
});
