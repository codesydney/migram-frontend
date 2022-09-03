import { signIn as nextAuthSignIn } from "next-auth/client";

export async function signin(credentials: { email: string; password: string }) {
  await nextAuthSignIn("credentials", {
    ...credentials,
    redirect: false,
    callbackUrl: "/",
  });
}
