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
import { LoginFormState } from "../Login";
import { SignUpFormState } from "../ProviderSignUp/hooks";

export const signIn = async (formValues: LoginFormState) => {
  const signInResponse = nextAuthSignIn("credentials", {
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
  const credentials = {
    email: user.email,
    password: user.password,
  };

  const signUpResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/signUp`,
    user
  );

  await signIn(credentials);

  return signUpResponse.data.data.user._id;
};

/**
 * Consolidated signup request for creating a new User and a Stripe Customer
 */
export const createCustomerUser = async (user: SignUpFormState) => {
  const signUpResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers`,
    user
  );

  debugger;

  return signUpResponse.data.data;
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
