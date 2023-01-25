import { Navigation as NavigationPrimitive } from "@shopify/polaris";
import {
  FinancesMajor,
  HomeMajor,
  JobsMajor,
  ListMajor,
} from "@shopify/polaris-icons";

export const Navigation = () => {
  return (
    <NavigationPrimitive location="/">
      <NavigationPrimitive.Section
        items={[
          {
            url: "/",
            label: "Home",
            icon: HomeMajor,
          },
          {
            url: "/listings",
            label: "Lists",
            icon: ListMajor,
          },
          {
            // todo
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
