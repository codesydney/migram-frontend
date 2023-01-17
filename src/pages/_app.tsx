import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import Nprogress from "nprogress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "nprogress/nprogress.css";

import type { AppProps } from "next/app";
import Layout from "@Components/common/Layout";
import { ElementsWrapper } from "@Components/utils/ElementsWrapper";

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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </SessionProvider>
    </ElementsWrapper>
  );
}
