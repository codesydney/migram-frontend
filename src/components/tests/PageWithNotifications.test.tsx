import { NotificationProps } from "../Notification";
import { renderWithPolarisTestProvider } from "src/test/utils";
import { PageWithNotifications } from "../PageWithNotifications";

function setupRender(componentProps?: NotificationProps) {
  return renderWithPolarisTestProvider(
    <PageWithNotifications {...componentProps} />
  );
}

test("Smoke test if BaseNotification renders", () => {
  const { baseElement } = setupRender();
  expect(baseElement).toBeInTheDocument();
});
