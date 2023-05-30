import { useUser } from "@clerk/nextjs";

/**
 * This wraps the useUser hook from Clerk and adds some additional properties
 * such as isCustomer and isServiceProvider
 */
export function useMigramUser() {
  const useUserReturn = useUser();
  const { user } = useUserReturn;
  const isProvider = user?.publicMetadata.role === "service-provider";
  const isCustomer = user?.publicMetadata.role === "customer";

  return { ...useUserReturn, isCustomer, isProvider };
}
