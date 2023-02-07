import { render, screen } from "@testing-library/react";

import { TasksPage } from "../TasksPage";

test("Smoke Test if it renders", () => {
  render(<TasksPage />);
  expect(screen.getByLabelText("Customer Tasks Page")).toBeTruthy();
});

test("It renders TaskCard as a child", () => {
  render(<TasksPage />);
  expect(screen.getByLabelText("Task Card")).toBeTruthy();
});
