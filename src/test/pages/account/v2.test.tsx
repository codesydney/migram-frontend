import { render, screen } from "@testing-library/react";
import { AccountPageV2 } from "../../../pages/account/v2";

describe("AccountPage V2", () => {
  test("smoke test if it renders", async () => {
    render(<AccountPageV2 session={undefined} />);

    expect(screen.queryByLabelText(/^Account Page$/i)).toBeTruthy();
  });
});
