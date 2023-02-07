import { render, screen } from "@testing-library/react";

import { TaskCard } from "../TasksPage";

test("Smoke Test if it renders", () => {
  render(<TaskCard />);
  expect(screen.getByLabelText("Task Card")).toBeTruthy();
});
