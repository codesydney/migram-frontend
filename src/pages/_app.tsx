import type { AppProps } from "next/app";
import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import Nprogress from "nprogress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "nprogress/nprogress.css";

import { ElementsWrapper } from "src/components/ElementsWrapper";
import { LayoutV2 } from "src/components";

if (process.env.NODE_ENV === "test") {
  require("../mocks");
}

Router.events.on("routeChangeStart", () => Nprogress.start());
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ElementsWrapper>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <LayoutV2>
            <Component {...pageProps} />
          </LayoutV2>
        </QueryClientProvider>
      </SessionProvider>
    </ElementsWrapper>
  );
}
