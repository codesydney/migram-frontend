export const UserType = {
  USER: "User",
  CUSTOMER: "Customer",
  PROVIDER: "Provider",
} as const;

export type PasswordLoginCredentials = { email: string; password: string };
