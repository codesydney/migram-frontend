import { PropsWithChildren } from "react";
import { AppProvider, Frame } from "@shopify/polaris";
import { HomeMinor, OrdersMinor, ProductsMinor } from "@shopify/polaris-icons";

import { TopBar } from "./";
import { Navigation } from "./Navigation";

import "@shopify/polaris/build/esm/styles.css";

export const LayoutV2 = ({ children }: PropsWithChildren<{}>) => {
  const TopBarMarkup = <TopBar />;
  const NavigationMarkup = <Navigation />;

  return (
    <AppProvider i18n={{}}>
      <Frame topBar={TopBarMarkup} navigation={NavigationMarkup}>
        {children}
      </Frame>
    </AppProvider>
  );
};
