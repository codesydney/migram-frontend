import axios from "axios";
import { Session } from "next-auth";
import { Dispatch } from "react";
import { signin } from ".";
import { ACTIONTYPE, State, Statuses } from "./CustomerSignupReducer";

export const createUser = (
  state: State,
  dispatch: Dispatch<ACTIONTYPE>,
  session: Session | null
) => {
  if (state.status !== Statuses.CREATE_USER) return;
  if (session) return;

  const { name, email, password, passwordConfirm } = state.values;

  const user = { name, email, password, passwordConfirm };
  const credentials = { email, password };

  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}api/v1/users/signUp`, user)
    .then(async () => {
      await signin(credentials);
      dispatch({ type: Statuses.CREATE_CUSTOMER });
    })
    .catch((error: any) => {
      console.log(error.response.status);
      console.log(error.response.data);
      dispatch({
        type: Statuses.REJECTED,
        error: new Error(error.response.data.message),
      });
    });
};

export const createCustomer = (
  state: State,
  dispatch: Dispatch<ACTIONTYPE>,
  session: Session | null
) => {
  if (state.status !== Statuses.CREATE_CUSTOMER) return;
  if (!session) return;

  const {
    password,
    name,
    email,
    phone,
    description,
    line1,
    line2,
    city,
    postal_code,
  } = state.values;

  const customer = {
    name,
    email,
    phone,
    description,
    shipping: {
      name,
      address: {
        line1,
        line2,
        city,
        state: state.values.state,
        postal_code,
      },
    },
  };

  const credentials = { email, password };
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/`, customer, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    .then(async () => {
      await signin(credentials);
      dispatch({ type: Statuses.RESOLVED });
    })
    .catch((error: any) => {
      console.log(error.response.status);
      console.log(error.response.data);
      dispatch({
        type: Statuses.REJECTED,
        error: new Error(error.response.data.message),
      });
    });
};
