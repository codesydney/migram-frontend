import { render, screen } from "@testing-library/react";

import { ManageBillingButton } from "../components/ManageBillingButton";

describe("ManageBillingButton", () => {
  test("smoke test if it renders", () => {
    render(<ManageBillingButton customerId="1" />);

    expect(screen.getByRole("button", { name: /^manage billing$/i }));
  });
});
