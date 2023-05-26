import { NextApiRequest } from "next";
import {
  SignedInAuthObject,
  User,
  clerkClient,
  getAuth,
} from "@clerk/nextjs/server";

export type AuthenticationResult =
  | {
      type: "success";
      auth: SignedInAuthObject;
      user: User;
      userId: string;
    }
  | {
      type: "error";
      status: number;
      message: string;
    };

export async function authenticate(
  req: NextApiRequest
): Promise<AuthenticationResult> {
  // this returns a null user for some reason
  const auth = await getAuth(req);
  if (!auth.userId)
    return { type: "error", status: 401, message: "Unauthorized" };

  const user = await clerkClient.users.getUser(auth.userId);
  if (!user)
    return { type: "error", status: 500, message: "Internal Server Error" };

  return { type: "success", auth, user, userId: auth.userId };
}
