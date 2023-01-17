import { PropsWithChildren } from "react";
import { AppProvider, Frame } from "@shopify/polaris";
import { HomeMinor, OrdersMinor, ProductsMinor } from "@shopify/polaris-icons";

import { TopBar } from "./";
import { Navigation } from "./Navigation";

import "@shopify/polaris/build/esm/styles.css";
import Layout from "@Components/common/Layout";

const logo = {
  width: 124,
  topBarSource: "/logo.png",
  url: "/",
  accessibilityLabel: "Migram",
} as const;

export const LayoutV2 = ({ children }: PropsWithChildren<{}>) => {
  const TopBarMarkup = <TopBar />;
  const NavigationMarkup = <Navigation />;

  return (
    <AppProvider i18n={{}}>
      <Frame logo={logo} topBar={TopBarMarkup} navigation={NavigationMarkup}>
        {process.env.NEXT_PUBLIC_REMOVE_LEGACY_STYLES === "true" ? (
          <>{children}</>
        ) : (
          <Layout>{children}</Layout>
        )}
      </Frame>
    </AppProvider>
  );
};
