import { useUser } from "@clerk/nextjs";

/**
 * This wraps the useUser hook from Clerk and adds some additional properties
 * such as isCustomer and isServiceProvider
 */
export function useMigramUser() {
  const useUserReturn = useUser();
  const { user } = useUserReturn;
  const userRole = user?.publicMetadata.role as
    | "customer"
    | "service-provider"
    | undefined;
  const isProvider = userRole === "service-provider";
  const isCustomer = userRole === "customer";

  return { ...useUserReturn, userRole, isCustomer, isProvider };
}
