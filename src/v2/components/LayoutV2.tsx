import { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";

import { AppProvider, Frame } from "@shopify/polaris";
import { TopBar } from "./";
import { Navigation } from "./Navigation";

import Layout from "@Components/common/Layout";
import "@shopify/polaris/build/esm/styles.css";

const logo = {
  width: 124,
  topBarSource: "/logo.png",
  url: "/",
  accessibilityLabel: "Migram",
} as const;

export const LayoutV2 = ({ children }: PropsWithChildren<{}>) => {
  const { data: session } = useSession();
  const TopBarMarkup = <TopBar />;
  const NavigationMarkup = session ? <Navigation /> : undefined;

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
