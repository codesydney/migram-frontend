import { BaseNotification, NotificationProps } from "..";

import { renderWithPolarisTestProvider } from "src/test/utils";

function setupRender(componentProps?: NotificationProps) {
  return renderWithPolarisTestProvider(
    <BaseNotification {...componentProps} />
  );
}

test("Smoke test if BaseNotification renders", () => {
  const { baseElement } = setupRender();
  expect(baseElement).toBeInTheDocument();
});
