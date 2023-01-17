import axios from "axios";
import { signOut as nextAuthSignOut } from "next-auth/react";
import router from "next/router";

import { SignUpFormState } from "../components";
import { deleteAuthHeader } from "../utils";

export const createUser = async (user: SignUpFormState) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/signUp`,
    user
  );
};

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
