import Router from "next/router";
import { Provider } from "next-auth/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import Layout from "../components/common/Layout";

import type { AppProps } from "next/app";

Router.events.on("routeChangeStart", () => Nprogress.start());
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

const stripePromise = loadStripe(
  "pk_test_51IyV4OFAD84FX6wfbxzuc1uNnh41w0BfoHKLumVTzCXzUSxFG6S5fly3Ry1Xl0kmpb8JoJD5IriwjC0cDO2Zf49W00NE4Gmy9S "
);
console.log(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </Elements>
  );
}
