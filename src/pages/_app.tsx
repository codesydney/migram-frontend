import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

import "../globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <Header />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
