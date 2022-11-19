import { render } from "@testing-library/react";
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

      await user.click(nameInput);
      await user.keyboard("testinput");

      expect(container.queryByText(/testinput/i)).toBeNull();
    });
  });
});
