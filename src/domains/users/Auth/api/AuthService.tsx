import axios from "axios";
import { getSession, signOut as nextAuthSignOut } from "next-auth/react";
import router from "next/router";

import { SignUpFormState } from "../components";
import { deleteAuthHeader, setAuthHeader } from "../utils";
import { signin } from "@Users/CustomerSignupPage";
import { routerPush } from "@Utils/router";

export const createUser = async (user: SignUpFormState) => {
  const credentials = {
    email: user.email,
    password: user.password,
  };

  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}api/v1/users/signUp`, user)
    .then(async (response) => {
      if (response.data) {
        /**
         * NextAuth's JWTs are not valid so we have to sign in again via the backend
         */
        await signin(credentials);
        const session = await getSession();

        await setAuthHeader(session);
        routerPush("/");
      }
    });
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
