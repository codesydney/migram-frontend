import { PropsWithChildren, useState } from "react";
import { useSession } from "next-auth/react";

import { AppProvider, Frame } from "@shopify/polaris";
import { TopBar } from ".";
import { Navigation } from "./Navigation";

import "@shopify/polaris/build/esm/styles.css";

const logo = {
  width: 124,
  topBarSource: "/logo.png",
  url: "/",
  accessibilityLabel: "Migram",
} as const;

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { data: session } = useSession();
  const NavigationMarkup = session ? <Navigation /> : undefined;
  const [showMobileNav, setShowMobileNav] = useState(false);
  const onMobileNavToggle = () => {
    setShowMobileNav(true);
  };
  const onNavigationDismiss = () => {
    setShowMobileNav(false);
  };

  return (
    <AppProvider i18n={{}}>
      <Frame
        logo={logo}
        topBar={<TopBar onMobileNavToggle={onMobileNavToggle} />}
        navigation={NavigationMarkup}
        showMobileNavigation={showMobileNav}
        onNavigationDismiss={onNavigationDismiss}
      >
        {children}
      </Frame>
    </AppProvider>
  );
};
