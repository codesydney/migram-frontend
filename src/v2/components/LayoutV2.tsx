import { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";

import { AppProvider, Frame } from "@shopify/polaris";
import { TopBar } from "./";
import { Navigation } from "./Navigation";

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
        {children}
      </Frame>
    </AppProvider>
  );
};
