import { render, screen } from "@testing-library/react";
import { User } from "next-auth";
import { AccountPageV2 } from "../../../pages/account/v2";

describe("AccountPage V2", () => {
  test("smoke test if it renders", async () => {
    render(<AccountPageV2 user={undefined} />);

    expect(screen.queryByLabelText(/^Account Page$/i)).toBeTruthy();
  });

  describe("When the User is a Customer", () => {
    it("renders ManageBillingButton", () => {
      const user: User = {
        id: "1",
        firstName: "David",
        lastName: "Taing",
        email: "customer@email.com",
        customerId: "cus_MtwlzVhYNsrTSg",
      };

      render(<AccountPageV2 user={user} />);

      expect(
        screen.queryByRole("button", { name: /^manage billing$/i })
      ).toBeTruthy();
    });
  });

  describe("When the User is a Provider", () => {
    it("does not render ManageBillingButton", () => {
      const user: User = {
        id: "1",
        firstName: "David",
        lastName: "Taing",
        email: "provider@email.com",
        providerId: "acct_1Lur4rIWxYvLVjGY",
      };

      render(<AccountPageV2 user={user} />);

      expect(
        screen.queryByRole("button", { name: /^manage billing$/i })
      ).toBeNull();
    });
  });
});
