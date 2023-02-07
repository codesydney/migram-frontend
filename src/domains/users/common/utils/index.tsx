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
  const newToken = `Bearer ${session?.accessToken}`;
  const isNotSameToken =
    newToken !== axios.defaults.headers.common["authorization"];

  if (session && isNotSameToken) {
    axios.defaults.headers.common["authorization"] = newToken;
  }
};
