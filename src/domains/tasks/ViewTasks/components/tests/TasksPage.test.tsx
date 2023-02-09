import { screen } from "@testing-library/react";

import { TasksPage } from "../TasksPage";

import { renderWithPolarisTestProvider } from "src/test/utils";

test("Smoke Test if it renders", () => {
  renderWithPolarisTestProvider(<TasksPage status="authenticated" />);
  expect(screen.getByLabelText("Customer Tasks Page")).toBeTruthy();
});

test("It renders TaskCard as a child", () => {
  renderWithPolarisTestProvider(<TasksPage status="authenticated" />);
  expect(screen.getByLabelText("Task Card")).toBeTruthy();
});
