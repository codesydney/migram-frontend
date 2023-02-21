import { BaseNotification } from "../Notification";
import { renderWithPolarisTestProvider } from "src/test/utils";

function setupRender() {
  return renderWithPolarisTestProvider(<BaseNotification />);
}

test("Smoke test if BaseNotification renders", () => {
  const { baseElement } = setupRender();
  expect(baseElement).toBeInTheDocument();
});
