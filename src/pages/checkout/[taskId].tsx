"use client";

import { FeatureFlag } from "../../utils/FeatureFlag";
import styled from "styled-components";

import { useRouter } from "next/router";
import { CheckoutForm } from "../../features/Checkout/CheckoutForm";

const StyledDiv = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const CheckoutPage = () => {
  const router = useRouter();
  const { taskId } = router.query as { taskId: string };

  return (
    <StyledDiv>
      <CheckoutForm />
    </StyledDiv>
  );
};

export default FeatureFlag(CheckoutPage, { isPage: true });
