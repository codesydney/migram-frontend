import styled from "styled-components";
import { CheckoutDetails } from "./CheckoutDetails";
import { CheckoutForm } from "./CheckoutForm";
import { useTaskFetch } from "./hooks";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  > * {
    padding-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  fieldset {
    margin: 0;
    padding: 0;
    border: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin: 0;
  }

  h1 {
    font-size: 2rem;
    line-height: 2.5rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    line-height: 1.75rem;
    margin-bottom: 1rem;
  }

  h3,
  h4 {
    font-size: 1.25rem;
    line-height: 1.5rem;
    margin-bottom: 1rem;
  }

  h5 {
    font-size: 1rem;
    line-height: 1.25rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.2rem;
    margin: 0 0 1rem;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;

    h1 {
      font-size: 2.5rem;
      line-height: 3rem;
      margin-bottom: 2.5rem;
    }

    h2 {
      font-size: 2rem;
      line-height: 2.5rem;
      margin-bottom: 2rem;
    }

    h3 {
      font-size: 1.75rem;
      line-height: 2rem;
      margin-bottom: 1.75rem;
    }

    h4 {
      font-size: 1.25rem;
      line-height: 1.75rem;
      margin-bottom: 1.25rem;
    }

    h5 {
      font-size: 1.25rem;
      line-height: 1.5rem;
      margin-bottom: 1.25rem;
    }
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
