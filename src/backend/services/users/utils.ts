import { User } from "@clerk/clerk-sdk-node";

export type getPrimaryEmailAddressResult =
  | {
      type: "success";
      email: string;
    }
  | {
      type: "error";
      error: Error;
    };

export function getPrimaryEmailAddress(
  user: User
): getPrimaryEmailAddressResult {
  const { primaryEmailAddressId, emailAddresses } = user;

  const primaryEmailAddress = emailAddresses.find(
    (email) => email.id === primaryEmailAddressId
  );

  if (!primaryEmailAddress)
    return {
      type: "error",
      error: new Error("Primary Email Address Not Found"),
    };

  return { type: "success", email: primaryEmailAddress.emailAddress };
}

export function isUserCustomer(user: User) {
  return user.publicMetadata.role === "customer";
}

export function isUserServiceProvider(user: User) {
  return user.publicMetadata.role === "service-provider";
}
