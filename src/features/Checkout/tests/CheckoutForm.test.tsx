import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutForm } from "../CheckoutForm";

jest.mock("next/router", () => require("next-router-mock"));

describe("CheckoutForm", () => {
  it("should validate billing details onSubmit", async () => {
    const user = userEvent.setup();
    const container = render(<CheckoutForm disabled={false} />);

    const checkoutButton = container.getByText(/checkout/i, {
      selector: "button",
    });

    await act(async () => user.click(checkoutButton));

    expect(container.getByText(/please enter address line 1/i)).toBeTruthy();
  });

  it("should validate billing details, onBlur", async () => {
    const user = userEvent.setup();
    const container = render(<CheckoutForm disabled={false} />);

    const nameInput = container.getByLabelText(/name/i);
    const line1Input = container.getByLabelText(/address line 1/i);

    await act(async () => user.click(nameInput));
    await act(async () => user.click(line1Input));

    expect(container.getByText(/please enter a name/i)).toBeTruthy();
  });
});
