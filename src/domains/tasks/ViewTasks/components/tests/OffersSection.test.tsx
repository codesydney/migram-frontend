import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { OffersSection } from "../TasksPage";

import { renderWithPolarisTestProvider } from "src/test/utils";
import { Task } from "@Tasks/common/types";

const task: Task = {
  location: {
    line1: "123 Fake St",
    city: "Sydney",
    state: "NSW",
    postal_code: "2000",
  },
  status: "open",
  photos: [],
  category: "Cleaning",
  title: "End of Lease Cleaning",
  details:
    "Hi, I'm moving out of my 2 bedroom unit in Sydney. We'll need it cleaned before handing off the keys to the agent.",
  budget: 200,
  timeOfArrival: "7am-10am",
  timeEstimate: "1-3hrs",
  dueDate: new Date("2023-01-27T00:00:00.000Z"),
  customerId: "cus_Me9Lz7memmLIEB",
  id: "63d26e6651167241c5f238a4",
};

function renderOffersSection() {
  return renderWithPolarisTestProvider(<OffersSection task={task} />);
}

test("Smoke test if it renders", () => {
  const { baseElement } = renderOffersSection();

  expect(baseElement).toBeInTheDocument();
});

it("renders a View Offers button", () => {
  renderOffersSection();

  const viewOffersButton = screen.queryByRole("button", { name: /^view$/i });
  expect(viewOffersButton).toBeTruthy();
});

it("renders OffersTable when View Offers button is clicked", async () => {
  renderOffersSection();
  const user = userEvent.setup();
  const viewOffersButton = screen.getByRole("button", { name: /^view$/i });

  await user.click(viewOffersButton);

  const offersList = screen.queryByLabelText("Offers Table");
  expect(offersList).toBeTruthy();
});
