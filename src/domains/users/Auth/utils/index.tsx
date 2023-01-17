import { Session, User } from "next-auth";
import { UserType } from "../types";
import axios from "axios";

/**
 * To be used in combination with the UserType readonly object
 */
export const getUserType = (user: User): keyof typeof UserType => {
  if (user?.customerId) return "CUSTOMER";

  if (user?.providerId) return "PROVIDER";

  return "USER";
};

export const deleteAuthHeader = () => {
  delete axios.defaults.headers.common["Authorization"];
};

export const setAuthHeader = async (session: Session | null) => {
  if (session && !axios.defaults.headers.common["authorization"]) {
    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${session?.accessToken}`;
  }
};
