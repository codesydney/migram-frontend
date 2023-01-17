import axios from "axios";
import { signOut as nextAuthSignOut } from "next-auth/react";
import router from "next/router";

export const signOut = async () => {
  const data: any = await nextAuthSignOut({
    redirect: false,
    callbackUrl: "/",
  });

  if (data.url) {
    delete axios.defaults.headers.common["Authorization"];
    router.push(data.url);
  }
};
