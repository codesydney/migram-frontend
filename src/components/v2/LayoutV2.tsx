import { PropsWithChildren } from "react";
import { AppProvider, Frame } from "@shopify/polaris";
import { TopBar } from "./TopBar";

import "@shopify/polaris/build/esm/styles.css";

export const LayoutV2 = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AppProvider i18n={{}}>
      <Frame topBar={<TopBar />}>{children}</Frame>
    </AppProvider>
  );
};
