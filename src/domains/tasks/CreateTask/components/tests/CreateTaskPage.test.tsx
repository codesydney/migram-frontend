import { screen, render } from "@testing-library/react";

import { CreateTaskPage } from "../CreateTaskPage";
import { PolarisTestProvider } from "@shopify/polaris";

test("Smoke test if CreateTaskPage renders", () => {
  render(
    <PolarisTestProvider>
      <CreateTaskPage />
    </PolarisTestProvider>
  );
  expect(screen.getByLabelText("Create Task Page")).toBeTruthy();
});
