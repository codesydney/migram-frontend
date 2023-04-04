import axios from "axios";
import {
  getSession,
  signOut as nextAuthSignOut,
  signIn as nextAuthSignIn,
} from "next-auth/react";
import router from "next/router";

import { deleteAuthHeader, setAuthHeader } from "../utils";
import { routerPush } from "@Utils/router";
import { PasswordLoginCredentials } from "../types";
import { LoginFormState } from "@Users/pages/Login";
import { SignUpFormState } from "@Users/pages/CustomerSignUp";

export const signIn = async (formValues: LoginFormState) => {
  const signInResponse = await nextAuthSignIn("credentials", {
    ...formValues,
    redirect: false,
    callbackUrl: "/",
  });

  const session = await getSession();
  await setAuthHeader(session);

  return signInResponse;
};

/**
 * Original signup endpoint for all users
 */
export const createUser = async (user: SignUpFormState) => {
  const signUpResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/signUp`,
    user
  );

  return signUpResponse.data.data.user._id;
};

/**
 * Consolidated signup request for creating a new User and a Stripe Customer
 */
export const createCustomerUser = async (user: SignUpFormState) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers`,
    user
  );
};

export const signInAndRedirectHome = async (
  credentials: PasswordLoginCredentials
) => {
  await signIn(credentials);
  const session = await getSession();

  await setAuthHeader(session);

  routerPush("/");
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
