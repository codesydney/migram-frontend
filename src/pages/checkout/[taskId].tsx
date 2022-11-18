"use client";

import { FeatureFlag } from "../../utils/FeatureFlag";
import styled from "styled-components";

import { useRouter } from "next/router";
import { CheckoutForm } from "../../features/Checkout/CheckoutForm";
import { CheckoutDetails } from "../../features/Checkout/CheckoutDetails";
import { useQuery } from "@tanstack/react-query";

const StyledDiv = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const fetchURL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/`;

const CheckoutPage = () => {
  const router = useRouter();
  const { taskId } = router.query as { taskId: string };

  const query = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await fetch(
        fetchURL + taskId
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <StyledDiv>
      <CheckoutDetails task={{}} />
      <CheckoutForm disabled={false} />
    </StyledDiv>
  );
};

export default FeatureFlag(CheckoutPage, { isPage: true });
