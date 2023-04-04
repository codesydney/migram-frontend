import { act, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "src/mocks/server";

import { ViewOffersPage, ViewOffersPageProps } from "../ViewOffersPage";
import { renderWithPolarisTestProvider } from "src/test/utils";
import {
  NotificationsProvider,
  InitialNotificationsState,
} from "src/common/features/notifications";

import { getTasksUrl } from "@Tasks/ViewOffers/api";
import userEvent from "@testing-library/user-event";
import { Offer } from "@Tasks/common/types";

type SetupRenderOptions = {
  componentProps: ViewOffersPageProps;
  initialProviderState?: InitialNotificationsState;
};

const defaultSetupRenderProps: SetupRenderOptions = {
  componentProps: {
    initialOffers: new Array<Offer>(),
  },
} as const;

async function setupRender({
  initialProviderState,
  componentProps,
}: SetupRenderOptions = defaultSetupRenderProps) {
  return renderWithPolarisTestProvider(
    <NotificationsProvider initialState={initialProviderState}>
      <ViewOffersPage {...componentProps} />
    </NotificationsProvider>
  );
}

const offer: Offer = {
  status: "completed",
  offerAmt: 195,
  comments: "waerawerawerw123123123123123",
  providerId: "acct_1Lur4rIWxYvLVjGY",
  task: "636060fa5fac2e5082d00903",
  id: "6360610f5fac2e5082d00912",
};

const getTaskNotFoundHandler = rest.get(
  `${getTasksUrl}/:id`,
  async (req, res, ctx) => {
    console.log("POLO");

    return res(
      ctx.status(404),
      ctx.json({ status: "error", message: "Task Not Found" })
    );
  }
);

test("smoke test if it renders", async () => {
  const componentProps: ViewOffersPageProps = {
    initialOffers: [offer],
  };

  await act(() => {
    setupRender({ componentProps });
  });

  const viewOffersPage = screen.getByLabelText(/^view offers page$/i);
  expect(viewOffersPage).toBeTruthy();
});

test("displays a list of OfferItems", async () => {
  const componentProps: ViewOffersPageProps = {
    initialOffers: [offer, offer],
  };

  await act(() => {
    setupRender({ componentProps });
  });

  const offerItems = screen.getAllByRole("heading", { name: /^offer$/i });
  expect(offerItems.length).toBeGreaterThan(1);
});

test("displays error notification when getTaskQuery fails", async () => {
  const componentProps: ViewOffersPageProps = {
    initialOffers: [offer],
  };

  // overrides the default MSW handlers
  server.use(getTaskNotFoundHandler);
  const user = userEvent.setup();

  await act(() => {
    setupRender({ componentProps });
  });

  const viewTaskDetailsButton = screen.getByRole("button", {
    name: /^view task details$/i,
  });

  await act(async () => {
    await user.click(viewTaskDetailsButton);
  });

  const notification = screen.getByText(/^task not found$/i);
  expect(notification).toBeInTheDocument();
});
