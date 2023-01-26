import { render, screen } from "@testing-library/react";
import { TasksPage } from "../TasksPage";

test("Smoke test if it renders", () => {
  render(<TasksPage />);
  expect(screen.getByLabelText("View Tasks Page")).toBeTruthy();
});
