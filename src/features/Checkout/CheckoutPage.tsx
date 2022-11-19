import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchURL } from "../../pages/checkout/[taskId]";
import { CheckoutDetails } from "./CheckoutDetails";
import { CheckoutForm } from "./CheckoutForm";

const StyledDiv = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const CheckoutPage = ({ taskId }: { taskId: string }) => {
  const query = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await fetch(fetchURL + taskId);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <StyledDiv>
      <CheckoutDetails task={{}} />
      <CheckoutForm disabled={true} />
    </StyledDiv>
  );
};
