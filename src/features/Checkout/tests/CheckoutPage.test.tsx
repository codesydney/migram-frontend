import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CheckoutPage } from "../CheckoutPage";

import { QueryClientWrapper } from "../../../test/utils";

describe("CheckoutPage at /checkout/:taskId", () => {
  describe("When the task is loading", () => {
    test("The form is disabled", async () => {
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
  });

  describe("When the task finishes loading", () => {
    test("The form is enabled", async () => {
      const user = userEvent.setup();
      const container = render(<CheckoutPage taskId="1" />, {
        wrapper: QueryClientWrapper,
      });

      await waitFor(() => container.getByText(/task/i));

      const nameInput = container.getByLabelText(/name/i);

      await user.click(nameInput);
      await userEvent.type(nameInput, "testinput");

      expect(container.getByDisplayValue(/testinput/i)).toBeTruthy();
    });
  });
});
