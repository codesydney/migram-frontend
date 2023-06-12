import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

import "../globals.css";
import { OnboardNewUserModal } from "@/components/OnboardNewUserModal";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <Header />
      <OnboardNewUserModal />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
