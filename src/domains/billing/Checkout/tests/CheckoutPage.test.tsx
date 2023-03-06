import {
  act,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { CheckoutPage } from "../CheckoutPage";

import { PropsWithChildren } from "react";
import {
  QueryClientWrapper,
  renderWithPolarisTestProvider,
} from "src/test/utils";
import { ElementsWrapper } from "src/components/ElementsWrapper";
import { ApiEventsProvider } from "src/common/ApiResponse/ApiEventsContext";
import { server } from "src/mocks/server";
import { rest } from "msw";
import { getTaskURL } from "../hooks";
import { createPaymentIntentUrl } from "../api";

const ProvidersWrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ElementsWrapper>
      <ApiEventsProvider>
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </ApiEventsProvider>
    </ElementsWrapper>
  );
};

function setupRender() {
  renderWithPolarisTestProvider(
    <ProvidersWrapper>
      <CheckoutPage taskId="1" />
    </ProvidersWrapper>
  );
}

const postPaymentIntentHandler = rest.post(
  createPaymentIntentUrl,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: "error",
        data: {
          client_secret: "client_secret",
        },
      })
    );
  }
);

const getTaskUnauthorizedHandler = rest.get(
  getTaskURL + "/:id",
  (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        status: "error",
        message: "You are unauthorized to access this task",
      })
    );
  }
);

test("Smoke test if it renders", async () => {
  setupRender();

  expect(screen.queryByLabelText(/$checkout page^/i));
});

it("displays the task details when the task loads", async () => {
  server.use(postPaymentIntentHandler);

  setupRender();

  const getLoadingElement = () => screen.getByText("Loading");

  await waitFor(() => waitForElementToBeRemoved(getLoadingElement));

  // value taken from mock handler for GET /tasks/:taskId
  // see: src/mocks/handlers/tasks.handler.ts
  expect(
    screen.getByText(/^asdfasdfasdfTest for provider$/i)
  ).toBeInTheDocument();
});

it("displays the Stripe Checkout Form when the task loads", async () => {
  server.use(postPaymentIntentHandler);

  await act(() => {
    setupRender();
  });

  // value taken from mock handler for GET /tasks/:taskId
  // see: src/mocks/handlers/tasks.handler.ts
  expect(screen.queryByLabelText(/^stripe checkout$/i)).toBeInTheDocument();
});

it("displays an error when the task fails to load", async () => {
  server.use(getTaskUnauthorizedHandler, postPaymentIntentHandler);

  await act(() => {
    setupRender();
  });

  // value taken from mock handler for GET /tasks/:taskId
  // see: src/mocks/handlers/tasks.handler.ts
  expect(
    screen.queryByText(/^you are unauthorized to access this task$/i)
  ).toBeInTheDocument();
});

it("does not display task details when the task fails to load", async () => {
  server.use(getTaskUnauthorizedHandler, postPaymentIntentHandler);

  await act(() => {
    setupRender();
  });

  // value taken from mock handler for GET /tasks/:taskId
  // see: src/mocks/handlers/tasks.handler.ts
  expect(
    screen.queryByText(/^asdfasdfasdfTest for provider$/i)
  ).not.toBeInTheDocument();
});

it("does not display the Stripe Checkout Form when the task fails to load", async () => {
  server.use(getTaskUnauthorizedHandler, postPaymentIntentHandler);

  await act(() => {
    setupRender();
  });

  // value taken from mock handler for GET /tasks/:taskId
  // see: src/mocks/handlers/tasks.handler.ts
  expect(screen.queryByLabelText(/^stripe checkout$/i)).not.toBeInTheDocument();
});
