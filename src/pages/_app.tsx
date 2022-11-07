import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

import type { AppProps } from "next/app";
import Layout from "../components/common/Layout";

Router.events.on("routeChangeStart", () => Nprogress.start());
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Elements>
  );
}
