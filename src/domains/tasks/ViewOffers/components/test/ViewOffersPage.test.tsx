import { act, screen } from "@testing-library/react";
import { rest } from "msw";
import { server } from "src/mocks/server";

import { ViewOffersPage, ViewOffersPageProps } from "../ViewOffersPage";
import { renderWithPolarisTestProvider } from "src/test/utils";
import {
  ApiEventsProvider,
  InitialApiEventsState,
} from "src/common/ApiResponse/ApiEventsContext";

import { getOffersUrl } from "@Tasks/ViewOffers/api";
import userEvent from "@testing-library/user-event";
import { getTaskURL } from "@Billing/Checkout/hooks";

type setupRenderOptions = {
  componentProps?: ViewOffersPageProps;
  initialProviderState?: InitialApiEventsState;
};

async function setupRender({
  initialProviderState,
  componentProps,
}: setupRenderOptions = {}) {
  return renderWithPolarisTestProvider(
    <ApiEventsProvider initialState={initialProviderState}>
      <ViewOffersPage
        status={
          componentProps?.status ? componentProps.status : "unauthenticated"
        }
      />
    </ApiEventsProvider>
  );
}

test("smoke test if it renders", async () => {
  const componentProps = { status: "authenticated" } as const;

  await act(() => {
    setupRender({ componentProps });
  });

  const viewOffersPage = screen.getByLabelText(/^view offers page$/i);
  expect(viewOffersPage).toBeTruthy();
});

test("loads a list of OfferItems", async () => {
  const componentProps = { status: "authenticated" } as const;

  await act(() => {
    setupRender({ componentProps });
  });

  const offerItems = screen.getAllByRole("heading", { name: /^offer$/i });
  expect(offerItems.length).toBeGreaterThan(1);
});

test("displays error notification when getOffersOfProviderQuery fails", async () => {
  const testErrorMessage = "THIS IS A TEST FAILURE";
  server.use(
    rest.get(getOffersUrl, async (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: testErrorMessage }));
    })
  );

  await act(() => {
    setupRender();
  });

  const notification = screen.getByText(/^Failed to load offers./i);
  expect(notification).toBeTruthy();
});

test("displays error notification when getTaskQuery fails", async () => {
  server.use(
    rest.get(getOffersUrl, async (req, res, ctx) => {
      const serverResponse = {
        status: "success",
        results: 16,
        data: {
          offers: [
            {
              status: "completed",
              _id: "6360610f5fac2e5082d00912",
              offerAmt: 195,
              comments: "waerawerawerw123123123123123",
              providerId: "acct_1Lur4rIWxYvLVjGY",
              task: "636060fa5fac2e5082d00903",
              createdAt: "2022-10-31T23:58:07.185Z",
              updatedAt: "2022-11-06T09:28:04.710Z",
              __v: 0,
              timeElapsed: "121 days ago",
              id: "6360610f5fac2e5082d00912",
            },
          ],
        },
      };

      return res(ctx.status(200), ctx.json(serverResponse));
    }),
    rest.get(`${getTaskURL}/:id`, async (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({ status: "error", message: "Invalid task" })
      );
    })
  );

  const user = userEvent.setup();

  await act(() => {
    setupRender();
  });

  const viewTaskDetailsButton = screen.getByRole("button", {
    name: /^view task details$/i,
  });

  await act(async () => {
    await user.click(viewTaskDetailsButton);
  });

  const notification = screen.getByText(/^invalid task$/i);
  expect(notification).toBeTruthy();
});
