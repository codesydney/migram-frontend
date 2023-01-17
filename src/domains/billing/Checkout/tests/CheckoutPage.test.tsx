import { render, screen } from "@testing-library/react";

import { CheckoutPage } from "../CheckoutPage";

import { PropsWithChildren } from "react";
import { ElementsWrapper } from "@Components/utils/ElementsWrapper";
import { QueryClientWrapper } from "src/test/utils";

const Wrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ElementsWrapper>
      <QueryClientWrapper>{children}</QueryClientWrapper>
    </ElementsWrapper>
  );
};

describe("CheckoutPage at /checkout/:taskId", () => {
  test("Smoke test if it renders", async () => {
    render(<CheckoutPage taskId="1" />, {
      wrapper: Wrapper,
    });

    expect(screen.queryByLabelText(/$checkout page^/i));
  });
});
