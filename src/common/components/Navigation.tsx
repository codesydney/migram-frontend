import { Navigation as NavigationPrimitive } from "@shopify/polaris";
import { FinancesMajor, HomeMajor, JobsMajor } from "@shopify/polaris-icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Session } from "next-auth";

function getMenuItems(session: Session | null) {
  if (session?.user.customerId) {
    return [
      {
        url: "/tasks",
        label: "Tasks",
        icon: JobsMajor,
      },
    ];
  }

  if (session?.user.providerId) {
    return [
      {
        url: "/offers",
        label: "Offers",
        icon: FinancesMajor,
      },
    ];
  }

  return [];
}

export const Navigation = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <NavigationPrimitive location={router.asPath}>
      <NavigationPrimitive.Section items={getMenuItems(session)} />
    </NavigationPrimitive>
  );
};
