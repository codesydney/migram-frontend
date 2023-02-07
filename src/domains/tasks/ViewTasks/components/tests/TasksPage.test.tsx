import { render, screen } from "@testing-library/react";

import { TasksPage } from "../TasksPage";

test("Smoke Test if it renders", () => {
  render(<TasksPage />);
  expect(screen.getByLabelText("Customer Tasks Page")).toBeTruthy();
});
