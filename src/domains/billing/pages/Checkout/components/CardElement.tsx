import { CardElement as CardElementPrimitive } from "@stripe/react-stripe-js";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin-top: 12px;

  .cardInput__container {
    margin-bottom: 12px;
    padding: 12px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
  }

  label {
    margin-bottom: 0.25rem;
    font-size: 0.93rem;
    font-weight: 400;
    font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
      Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: rgb(48, 49, 61);
  }
`;

/**
 * Wrapper for Stripe's CardElement. Adds a Label and Styling.
 */
export const CardElement = () => {
  return (
    <StyledDiv>
      <label>Card details</label>
      <div className="cardInput__container">
        <CardElementPrimitive
          id="card-element"
          options={{ hidePostalCode: true }}
        />
      </div>
    </StyledDiv>
  );
};
