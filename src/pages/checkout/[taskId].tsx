"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeatureFlag } from "../../utils/FeatureFlag";
import styled from "styled-components";

import { useRouter } from "next/router";
import {
  Schema,
  schema,
  CheckoutForm,
} from "../../features/Checkout/CheckoutForm";
import { useCheckoutForm } from "../../features/Checkout/hooks";

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
