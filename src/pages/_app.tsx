import Router from "next/router";
import { Provider } from "next-auth/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import Layout from "../components/common/Layout";

import type { AppProps } from "next/app";

import "../styles/globals.css";
import { Header } from "../components/common/Header";

Router.events.on("routeChangeStart", () => Nprogress.start());
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>
      <Provider session={pageProps.session}>
        <Header />
        <div className="container">
          <Component {...pageProps} />
        </div>
      </Provider>
    </Elements>
  );
}
