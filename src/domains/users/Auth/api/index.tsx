import axios from "axios";
import { Session, User } from "next-auth";
import { signOut as nextAuthSignOut } from "next-auth/react";
import router from "next/router";
import { UserType } from "../types";

export const signOut = async () => {
  const data: any = await nextAuthSignOut({
    redirect: false,
    callbackUrl: "/",
  });

  if (data.url) {
    deleteAuthHeader();
    router.push(data.url);
  }
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

/**
 * To be used in combination with the UserType readonly object
 */
export const getUserType = (user: User): keyof typeof UserType => {
  if (user?.customerId) return "CUSTOMER";

  if (user?.providerId) return "PROVIDER";

  return "USER";
};
