import { useReducer } from "react";
import {
  FormValues,
  defaultFormValues,
} from "../components/CustomerSignupForm";

export enum Statuses {
  IDLE = "IDLE",
  CREATE_USER = "CREATE_USER",
  CREATE_CUSTOMER = "CREATE_CUSTOMER",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

export interface State {
  status: Statuses;
  error?: Error;
  values: FormValues;
}

const initialState: State = {
  status: Statuses.IDLE,
  error: undefined,
  values: defaultFormValues,
};

export type ACTIONTYPE =
  | { type: Statuses.IDLE }
  | { type: "SUBMIT_FORM"; values: FormValues }
  | { type: Statuses.CREATE_USER }
  | { type: Statuses.CREATE_CUSTOMER }
  | { type: Statuses.RESOLVED }
  | { type: Statuses.REJECTED; error: Error }
  | { type: "CLOSE_ERROR" };

function reducer(state: State, action: ACTIONTYPE) {
  switch (action.type) {
    case Statuses.IDLE:
      return { ...state, status: Statuses.IDLE };
    case "SUBMIT_FORM":
      return {
        ...state,
        status: Statuses.CREATE_USER,
        values: action.values,
        error: undefined,
      };
    case Statuses.CREATE_CUSTOMER:
      return { ...state, status: Statuses.CREATE_CUSTOMER };
    case Statuses.RESOLVED:
      return { ...state, status: Statuses.RESOLVED, values: defaultFormValues };
    case Statuses.REJECTED:
      return { ...state, status: Statuses.REJECTED, error: action.error };
    case "CLOSE_ERROR":
      return { ...state, error: undefined };
    default:
      throw new Error("Customer Onboard Reducer Failed");
  }
}

export const useCustomerSignupReducer = () => {
  return useReducer(reducer, initialState);
};
