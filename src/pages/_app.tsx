import type { AppProps } from "next/app";
import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

import { Layout } from "src/common/components";
import { ClientProviders } from "src/common/components/ClientProviders";

if (process.env.NODE_ENV === "test") {
  require("../mocks");
}

Router.events.on("routeChangeStart", () => Nprogress.start());
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientProviders>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ClientProviders>
  );
}
