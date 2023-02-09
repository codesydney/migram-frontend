import { screen } from "@testing-library/react";

import { TaskCard } from "../TasksPage";

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

function renderTaskCard() {
  return renderWithPolarisTestProvider(<TaskCard task={task} />);
}

test("Smoke Test if it renders", () => {
  renderTaskCard();

  const taskCard = screen.queryByLabelText("Task Card");
  expect(taskCard).toBeTruthy();
});

it("renders a 'Details' section", () => {
  renderTaskCard();

  const detailsHeading = screen.queryByRole("heading", { name: /^details$/i });
  expect(detailsHeading).toBeTruthy();
});

it("renders an 'Offers' section", () => {
  renderTaskCard();

  const offersHeading = screen.queryByRole("heading", { name: /^offers$/i });
  expect(offersHeading).toBeTruthy();
});

it("does not initially render OffersList", () => {
  renderTaskCard();

  const offersList = screen.queryByLabelText("Offers List");
  expect(offersList).toBeNull();
});
