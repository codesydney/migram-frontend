import Router from "next/router";
import { Provider } from "next-auth/client";
import Layout from "../components/common/Layout";
import Nprogress from "nprogress";

// TODO: Swap with our own
// import '../components/styles/nprogress.css';
import "nprogress/nprogress.css";

import type { AppProps } from "next/app";

Router.events.on("routeChangeStart", () => Nprogress.start());
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
