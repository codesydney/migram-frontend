import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { TextInput } from "../TextInput";

describe("TextInput", () => {
  it("should display an error message if error prop is provided", () => {
    render(<TextInput label="Name" id="name" error="ERROR" />);

    expect(screen.queryByText("ERROR")).toBeTruthy();
  });

  it("Should have no error message if error prop is not provided", () => {
    render(<TextInput label="Name" id="name" />);

    expect(screen.queryByText("ERROR")).toBeFalsy();
  });

  test("input should be focused after clicking on the label", async () => {
    const user = userEvent.setup();
    render(
      <>
        <TextInput label="Name" id="name" />
        <TextInput label="Email" id="email" type="email" />
      </>
    );

    const nameLabel = screen.getByText(/name/i);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.click(nameLabel);

    expect(emailInput).not.toHaveFocus();
    expect(nameInput).toHaveFocus();
  });
});
