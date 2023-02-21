import { Navigation as NavigationPrimitive } from "@shopify/polaris";
import { FinancesMajor, HomeMajor, JobsMajor } from "@shopify/polaris-icons";
import { useRouter } from "next/router";

export const Navigation = () => {
  const router = useRouter();

  return (
    <NavigationPrimitive location={router.asPath}>
      <NavigationPrimitive.Section
        items={[
          {
            url: "/tasks",
            label: "Tasks",
            icon: JobsMajor,
          },
          {
            url: "/offers",
            label: "Offers",
            icon: FinancesMajor,
          },
        ]}
      />
    </NavigationPrimitive>
  );
};
