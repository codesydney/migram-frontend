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
            url: "/tasks",
            label: "Tasks",
            icon: ListMajor,
          },
          {
            url: "/offers",
            label: "Offers",
            icon: FinancesMajor,
          },
          {
            // todo
            url: "/jobs",
            label: "Jobs",
            icon: JobsMajor,
          },
        ]}
      />
    </NavigationPrimitive>
  );
};
