import styled from "styled-components";

import { ErrorNotification, SuccessNotification } from "./Notification";
import {
  Statuses,
  useCustomerSignupReducer,
} from "../api/CustomerSignupReducer";
import { CustomerSignupForm, FormValues } from "./CustomerSignupForm";
import { useStripe } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { createUser, createCustomer } from "../api/effects";

const StyledDiv = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap");
  font-family: "Poppins", sans-serif;

  margin-inline: 2rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 0;
    max-width: 500px;
    margin-inline: auto;
  }
`;

export const CustomerSignupPage = () => {
  const [state, dispatch] = useCustomerSignupReducer();
  const [session] = useSession();
  const stripe = useStripe();

  const onSubmit = async (data: FormValues) => {
    dispatch({ type: "SUBMIT_FORM", values: data });
  };

  useEffect(
    () => createUser(state, dispatch, session),
    [state, session, dispatch]
  );

  useEffect(
    () => createCustomer(state, dispatch, session, stripe),
    [session, state, dispatch, stripe]
  );

  // Temporary Loading Status.
  if (
    state.status === Statuses.CREATE_USER ||
    state.status === Statuses.CREATE_CUSTOMER
  )
    return (
      <StyledDiv className="customerOnboardPage">
        <div>Loading...</div>
      </StyledDiv>
    );

  return (
    <StyledDiv className="customerOnboardPage">
      <CustomerSignupForm onSubmit={onSubmit} values={state.values} />
      {state.error && (
        <ErrorNotification
          title=""
          message={state.error.message}
          handleClose={() => dispatch({ type: "CLOSE_ERROR" })}
        />
      )}
      {state.status === Statuses.RESOLVED && (
        <SuccessNotification
          title="Account Created"
          message="Account Setup."
          handleClose={() => dispatch({ type: Statuses.IDLE })}
        />
      )}
    </StyledDiv>
  );
};
