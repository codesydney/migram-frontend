import styled from "styled-components";
import { CheckoutDetails } from "./CheckoutDetails";
import { CheckoutForm } from "./CheckoutForm";
import { useTaskFetch } from "./hooks";

const StyledDiv = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const CheckoutPage = ({ taskId }: { taskId: string }) => {
  const query = useTaskFetch(taskId);
  const isLoading = query.isLoading;

  return (
    <StyledDiv>
      <CheckoutDetails task={query.data} isLoading={isLoading} />
      <CheckoutForm disabled={isLoading} />
    </StyledDiv>
  );
};
