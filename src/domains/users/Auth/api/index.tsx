import axios from "axios";
import { Session } from "next-auth";
import { signOut as nextAuthSignOut } from "next-auth/react";
import router from "next/router";

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
