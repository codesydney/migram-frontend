import { users } from "@clerk/clerk-sdk-node";

export async function getUser(userId: string) {
  return users.getUser(userId);
}

export type UpdateUserParams = {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  skipPasswordChecks?: boolean;
  signOutOfOtherSessions?: boolean;
  primaryEmailAddressId?: string;
  primaryPhoneNumberId?: string;
  primaryWeb3WalletId?: string;
  profileImageID?: string;
  totpSecret?: string;
  backupCodes?: string[];
  externalId?: string;
  createdAt?: Date;
  publicMetadata?: UserPublicMetadata;
  privateMetadata?: Record<string, unknown>;
  unsafeMetadata?: Record<string, unknown>;
};

export async function updateUser(userId: string, params: UpdateUserParams) {
  return users.updateUser(userId, params);
}
