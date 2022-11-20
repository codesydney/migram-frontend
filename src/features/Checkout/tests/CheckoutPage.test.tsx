import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CheckoutPage } from "../CheckoutPage";

import { QueryClientWrapper } from "../../../test/utils";

describe("CheckoutPage at /checkout/:taskId", () => {
  it("The form is disabled when the task is loading", async () => {
    const user = userEvent.setup();
    const container = render(<CheckoutPage taskId="1" />, {
      wrapper: QueryClientWrapper,
    });

    expect(container.getByText(/loading/i)).toBeTruthy();

    const nameInput = container.getByLabelText(/name/i);
    const addressLine1Input = container.getByLabelText(/address line 1/i);

    await user.click(nameInput);
    await user.click(addressLine1Input);

    expect(container.queryByText(/please enter a name/i)).toBeNull();
  });

  it("The form is enabled when the task finishes loading", async () => {
    const user = userEvent.setup();
    const container = render(<CheckoutPage taskId="1" />, {
      wrapper: QueryClientWrapper,
    });

    await waitFor(() => container.getByText(/task details/i));

    const nameInput = container.getByLabelText(/name/i);

    await user.click(nameInput);
    await userEvent.type(nameInput, "testinput");

    expect(container.getByDisplayValue(/testinput/i)).toBeTruthy();
  });
});
