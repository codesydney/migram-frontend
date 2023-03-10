import { act, screen, waitFor } from "@testing-library/react";

import { CheckoutPage } from "../CheckoutPage";

import { PropsWithChildren } from "react";
import {
  QueryClientWrapper,
  renderWithPolarisTestProvider,
} from "src/test/utils";
import { ElementsWrapper } from "src/components/ElementsWrapper";
import { ApiEventsProvider } from "src/common/features/ApiResponse";
import { server } from "src/mocks/server";
import { rest } from "msw";
import { createPaymentIntentUrl } from "../../api";
import { getCheckoutTaskURL } from "@Billing/Checkout/hooks";
import { createGetTaskResponse } from "./testUtils";

const ProvidersWrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ElementsWrapper>
      <ApiEventsProvider>
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </ApiEventsProvider>
    </ElementsWrapper>
  );
};

export function setupRender() {
  return renderWithPolarisTestProvider(
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
  getCheckoutTaskURL + "/:id",
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

const getSuccessTaskResponse_PaymentStatusUndefined = rest.get(
  getCheckoutTaskURL + "/:id",
  (req, res, ctx) => {
    const data = createGetTaskResponse({
      paymentStatus: undefined,
    });

    return res(ctx.status(200), ctx.json(data));
  }
);

const getSuccessTaskResponse_PaymentStatusPaid = rest.get(
  getCheckoutTaskURL + "/:id",
  (req, res, ctx) => {
    const data = createGetTaskResponse({
      paymentStatus: "paid",
    });

    return res(ctx.status(200), ctx.json(data));
  }
);

test("Smoke test if it renders", async () => {
  setupRender();

  expect(screen.queryByLabelText(/$checkout page^/i));
});

it("displays the task details when the task loads", async () => {
  server.use(postPaymentIntentHandler);

  await act(() => {
    setupRender();
  });

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

it("shows the error 'Checkout Error: The Task has been not completed yet' when the Task is not completed", async () => {
  server.use(
    getSuccessTaskResponse_PaymentStatusUndefined,
    postPaymentIntentHandler
  );

  setupRender();

  const getError = () =>
    screen.getByText("Checkout Error: The Task has been not completed yet");

  await waitFor(() => expect(getError()).toBeTruthy());
});

it("shows the error 'Checkout Error: The Task has been paid' when the Task's paymentStatus is 'paid", async () => {
  server.use(
    getSuccessTaskResponse_PaymentStatusPaid,
    postPaymentIntentHandler
  );

  await act(async () => {
    setupRender();
  });

  const getError = () =>
    screen.getByText("Checkout Error: The Task has been paid");

  await waitFor(() => expect(getError()).toBeTruthy());
});
